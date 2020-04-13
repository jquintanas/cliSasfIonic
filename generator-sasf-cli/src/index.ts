const fss = require('fs');
//const request = require('request');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const imageDownloader = require('./downloader').download;

//imports personalizados
import { prompLogin } from "./prompLogin";
import { prompDatosAutor } from "./prompDatosAutor";
import { metadataGenerador } from "./metadataGenerador";
import { generadorIonic } from "./generadorIonic";
import { colores } from "./colores";
import { metadalaColores } from "./metadataColores";

//variables personalizadas
const respLogin = null;
const respDatosAutor = null;
const colorRespuesta: metadalaColores[] = new Array();



module.exports = class extends Generator {
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Bienvenidos a ${chalk.red('generator-cli-sasf')}!`)
    );
    //promt de login
    let protLogin: prompLogin = new prompLogin();
    this.respLogin = await protLogin.generarPrompts();
    if (this.respLogin.status) {
      let color: colores = new colores(this.respLogin.user);
      await color.buscarColores().then((colores: any) => {
        if (colores.length > 0) {
          console.log("Colores y fuentes obtenidas.");
          this.colorRespuesta = colores;
        }
        else {
          console.log("No hay colores disponibles");
        }
      }, (err: any) => {
        console.log("No hay colores disponibles");
        console.log(err);
      })
      let protDatosAutor: prompDatosAutor = new prompDatosAutor(this.appname);
      this.respDatosAutor = await protDatosAutor.generarPrompts();
    }
    return;
  }

  writing() {
    if (this.respLogin.status) {
      let fontUrl: string = "";
      //se agregan archivos personalizados
      console.log("Generando proyecto de ionic");
      let genIonic: generadorIonic = new generadorIonic();
      genIonic.addDatoConAdicional("_capacitor.config.json", "capacitor.config.json", {
        appName: this.respDatosAutor.proyecto
      });

      genIonic.addDatoConAdicional("_package-lock.json", "package-lock.json", {
        appName: this.respDatosAutor.proyecto,
        empresa: this.respLogin.data.empresa
      });

      genIonic.addDatoConAdicional("_package.json", "package.json", {
        appName: this.respDatosAutor.proyecto,
        repositorio: this.respDatosAutor.repositorio,
        descripcion: this.respDatosAutor.descripcion,
        autor: this.respDatosAutor.autor,
        empresa: this.respLogin.data.empresa
      });
      let jsonDatos = {
        color1: "",
        color1RGB: "",
        contraste1: "",
        contraste1RGB: "",
        shade1: "",
        tint1: "",
        color2: "",
        color2RGB: "",
        contraste2: "",
        contraste2RGB: "",
        shade2: "",
        tint2: ""
      };
      for (let k = 0; k < this.colorRespuesta.length; k++) {
        if (this.colorRespuesta[k].esPrimario) {
          fontUrl = this.colorRespuesta[k].font;
          jsonDatos.color1 = this.colorRespuesta[k].color;
          jsonDatos.color1RGB = this.colorRespuesta[k].colorRGB;
          jsonDatos.contraste1 = this.colorRespuesta[k].contraste;
          jsonDatos.contraste1RGB = this.colorRespuesta[k].contrasteRGB;
          jsonDatos.shade1 = this.colorRespuesta[k].shade;
          jsonDatos.tint1 = this.colorRespuesta[k].tint;
        }
        else {
          jsonDatos.color2 = this.colorRespuesta[k].color;
          jsonDatos.color2RGB = this.colorRespuesta[k].colorRGB;
          jsonDatos.contraste2 = this.colorRespuesta[k].contraste;
          jsonDatos.contraste2RGB = this.colorRespuesta[k].contrasteRGB;
          jsonDatos.shade2 = this.colorRespuesta[k].shade;
          jsonDatos.tint2 = this.colorRespuesta[k].tint;
        }
      }
      genIonic.addDatoConAdicional("src/theme/variables.scss", "src/theme/variables.scss", jsonDatos);
      let datosEscribirArray: metadataGenerador[] = new Array();
      datosEscribirArray = genIonic.obtenerArchivos();

      //se procede a copiar los archivos de la plantilla
      for (let i = 0; i < datosEscribirArray.length; i++) {
        if (datosEscribirArray[i].adicional == null) {
          this.fs.copy(
            this.templatePath(datosEscribirArray[i].origen),
            this.destinationPath(datosEscribirArray[i].destino)
          );
        }
        else {
          this.fs.copyTpl(
            this.templatePath(datosEscribirArray[i].origen),
            this.destinationPath(datosEscribirArray[i].destino), datosEscribirArray[i].adicional
          );
        }
      }

      if (!fss.existsSync("resources")) {
        fss.mkdirSync("resources");
        console.log("Directorio resources creado.")
      }
      else {
        console.log("Directorio resources ya eciste.")
      }


      //copiado de logo
      let logoUrl: string = this.respLogin.data.logo;
      if (logoUrl != "") {
        try {
          imageDownloader(logoUrl, "resources/logo.png", function () {
            console.log(`${logoUrl} imagen descargada!!`);
            console.log("logo.png creado en directorio resources.")
          });
        } catch (error) {
          console.log(error);
          console.log("No se pudo descargar el logo.");
        }
      }

      //copiado de splash
      let splashUrl: string = this.respLogin.data.splash;
      if (splashUrl != "") {
        try {
          imageDownloader(splashUrl, "resources/splash.png", function () {
            console.log(`${splashUrl} imagen descargada!!`);
            console.log("logo.png creado en directorio resources.")
          });
        } catch (error) {
          console.log(error);
          console.log("No se pudo descargar el splash screen.");
        }
      }

      try {
        imageDownloader(fontUrl, "src/assets/fonts/slabo.woff2", function () {
          console.log(`${fontUrl} imagen descargada!!`);
          console.log("logo.png creado en directorio resources.")
        });
      }
      catch (err) {
        console.log("fuente error")
        console.log(err);
      }
    }
  }

  install() {
    if (this.respLogin.status) {
      this.npmInstall(['tsd'], { 'global': true });
      this.npmInstall();
    }
  }


};