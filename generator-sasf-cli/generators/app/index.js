"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fss = require('fs');
//const request = require('request');
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const imageDownloader = require('./downloader').download;
//imports personalizados
const prompLogin_1 = require("./prompLogin");
const prompDatosAutor_1 = require("./prompDatosAutor");
const generadorIonic_1 = require("./generadorIonic");
const colores_1 = require("./colores");
//variables personalizadas
const respLogin = null;
const respDatosAutor = null;
const colorRespuesta = new Array();
module.exports = class extends Generator {
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            // Have Yeoman greet the user.
            this.log(yosay(`Bienvenidos a ${chalk.red('generator-cli-sasf')}!`));
            //promt de login
            let protLogin = new prompLogin_1.prompLogin();
            this.respLogin = yield protLogin.generarPrompts();
            if (this.respLogin.status) {
                let color = new colores_1.colores(this.respLogin.user);
                yield color.buscarColores().then((colores) => {
                    if (colores.length > 0) {
                        console.log("Colores y fuentes obtenidas.");
                        this.colorRespuesta = colores;
                    }
                    else {
                        console.log("No hay colores disponibles");
                    }
                }, (err) => {
                    console.log("No hay colores disponibles");
                    console.log(err);
                });
                let protDatosAutor = new prompDatosAutor_1.prompDatosAutor(this.appname);
                this.respDatosAutor = yield protDatosAutor.generarPrompts();
            }
            return;
        });
    }
    writing() {
        if (this.respLogin.status) {
            let fontUrl = "";
            //se agregan archivos personalizados
            console.log("Generando proyecto de ionic");
            let genIonic = new generadorIonic_1.generadorIonic();
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
            let datosEscribirArray = new Array();
            datosEscribirArray = genIonic.obtenerArchivos();
            //se procede a copiar los archivos de la plantilla
            for (let i = 0; i < datosEscribirArray.length; i++) {
                if (datosEscribirArray[i].adicional == null) {
                    this.fs.copy(this.templatePath(datosEscribirArray[i].origen), this.destinationPath(datosEscribirArray[i].destino));
                }
                else {
                    this.fs.copyTpl(this.templatePath(datosEscribirArray[i].origen), this.destinationPath(datosEscribirArray[i].destino), datosEscribirArray[i].adicional);
                }
            }
            if (!fss.existsSync("resources")) {
                fss.mkdirSync("resources");
                console.log("Directorio resources creado.");
            }
            else {
                console.log("Directorio resources ya eciste.");
            }
            //copiado de logo
            let logoUrl = this.respLogin.data.logo;
            if (logoUrl != "") {
                try {
                    imageDownloader(logoUrl, "resources/logo.png", function () {
                        console.log(`${logoUrl} imagen descargada!!`);
                        console.log("logo.png creado en directorio resources.");
                    });
                }
                catch (error) {
                    console.log(error);
                    console.log("No se pudo descargar el logo.");
                }
            }
            //copiado de splash
            let splashUrl = this.respLogin.data.splash;
            if (splashUrl != "") {
                try {
                    imageDownloader(splashUrl, "resources/splash.png", function () {
                        console.log(`${splashUrl} imagen descargada!!`);
                        console.log("logo.png creado en directorio resources.");
                    });
                }
                catch (error) {
                    console.log(error);
                    console.log("No se pudo descargar el splash screen.");
                }
            }
            try {
                imageDownloader(fontUrl, "src/assets/fonts/slabo.woff2", function () {
                    console.log(`${fontUrl} imagen descargada!!`);
                    console.log("logo.png creado en directorio resources.");
                });
            }
            catch (err) {
                console.log("fuente error");
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
