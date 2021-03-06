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
const request = require("request-promise");
class colores {
    constructor(usuario) {
        this.url = "https://api-sasf.herokuapp.com/api/colores/";
        this.jsonDatos = {
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
            tint2: "",
            color3: "",
            color3RGB: "",
            contraste3: "",
            contraste3RGB: "",
            shade3: "",
            tint3: "",
            color4: "",
            color4RGB: "",
            contraste4: "",
            contraste4RGB: "",
            shade4: "",
            tint4: "",
            color5: "",
            color5RGB: "",
            contraste5: "",
            contraste5RGB: "",
            shade5: "",
            tint5: ""
        };
        this.usuario = usuario;
        this.datosColores = new Array();
        this.datosColores.push({
            color: "#428cff",
            colorRGB: "66,140,255",
            contraste: "#ffffff",
            contrasteRGB: "255,255,255",
            shade: "#3a7be0",
            tint: "#5598ff",
            tipoColor: "primario"
        });
        this.datosColores.push({
            tipoColor: "secundario",
            color: "#50c8ff",
            colorRGB: "80,200,255",
            contraste: "#ffffff",
            contrasteRGB: "255,255,255",
            shade: "#46b0e0",
            tint: "#62ceff",
        });
        this.datosColores.push({
            tipoColor: "cabecera",
            color: "#50c8ff",
            colorRGB: "80,200,255",
            contraste: "#ffffff",
            contrasteRGB: "255,255,255",
            shade: "#46b0e0",
            tint: "#62ceff",
        });
        this.datosColores.push({
            tipoColor: "menu",
            color: "#50c8ff",
            colorRGB: "80,200,255",
            contraste: "#ffffff",
            contrasteRGB: "255,255,255",
            shade: "#46b0e0",
            tint: "#62ceff",
        });
        this.datosColores.push({
            tipoColor: "bannerI",
            color: "#50c8ff",
            colorRGB: "80,200,255",
            contraste: "#ffffff",
            contrasteRGB: "255,255,255",
            shade: "#46b0e0",
            tint: "#62ceff",
        });
    }
    buscarColores() {
        return __awaiter(this, void 0, void 0, function* () {
            yield request({
                uri: this.url + this.usuario,
                json: true,
            }).then((data) => {
                if (data != null) {
                    for (let i = 0; i < data.length; i++) {
                        this.datosColores[i].color = data[i].color;
                        this.datosColores[i].colorRGB = data[i].colorRGB;
                        this.datosColores[i].contraste = data[i].contraste;
                        this.datosColores[i].contrasteRGB = data[i].contrasteRGB;
                        this.datosColores[i].shade = data[i].shade;
                        this.datosColores[i].tint = data[i].tint;
                        this.datosColores[i].tipoColor = data[i].tipoColore.nombre;
                    }
                    console.log("Colores descargados.");
                }
            }, (err) => {
                console.log(err);
                console.log("No se pudo descargar los colores.");
            });
        });
    }
    generarColores() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscarColores();
            for (let i = 0; i < 5; i++) {
                if (this.datosColores[i].tipoColor == "primario") {
                    this.jsonDatos.color1 = this.datosColores[i].color;
                    this.jsonDatos.color1RGB = this.datosColores[i].colorRGB;
                    this.jsonDatos.contraste1 = this.datosColores[i].contraste;
                    this.jsonDatos.contraste1RGB = this.datosColores[i].contrasteRGB;
                    this.jsonDatos.shade1 = this.datosColores[i].shade;
                    this.jsonDatos.tint1 = this.datosColores[i].tint;
                }
                else if (this.datosColores[i].tipoColor == "secundario") {
                    this.jsonDatos.color2 = this.datosColores[i].color;
                    this.jsonDatos.color2RGB = this.datosColores[i].colorRGB;
                    this.jsonDatos.contraste2 = this.datosColores[i].contraste;
                    this.jsonDatos.contraste2RGB = this.datosColores[i].contrasteRGB;
                    this.jsonDatos.shade2 = this.datosColores[i].shade;
                    this.jsonDatos.tint2 = this.datosColores[i].tint;
                }
                else if (this.datosColores[i].tipoColor == "cabecera") {
                    this.jsonDatos.color3 = this.datosColores[i].color;
                    this.jsonDatos.color3RGB = this.datosColores[i].colorRGB;
                    this.jsonDatos.contraste3 = this.datosColores[i].contraste;
                    this.jsonDatos.contraste3RGB = this.datosColores[i].contrasteRGB;
                    this.jsonDatos.shade3 = this.datosColores[i].shade;
                    this.jsonDatos.tint3 = this.datosColores[i].tint;
                }
                else if (this.datosColores[i].tipoColor == "menu") {
                    this.jsonDatos.color4 = this.datosColores[i].color;
                    this.jsonDatos.color4RGB = this.datosColores[i].colorRGB;
                    this.jsonDatos.contraste4 = this.datosColores[i].contraste;
                    this.jsonDatos.contraste4RGB = this.datosColores[i].contrasteRGB;
                    this.jsonDatos.shade4 = this.datosColores[i].shade;
                    this.jsonDatos.tint4 = this.datosColores[i].tint;
                }
                else {
                    this.jsonDatos.color5 = this.datosColores[i].color;
                    this.jsonDatos.color5RGB = this.datosColores[i].colorRGB;
                    this.jsonDatos.contraste5 = this.datosColores[i].contraste;
                    this.jsonDatos.contraste5RGB = this.datosColores[i].contrasteRGB;
                    this.jsonDatos.shade5 = this.datosColores[i].shade;
                    this.jsonDatos.tint5 = this.datosColores[i].tint;
                }
            }
            return this.jsonDatos;
        });
    }
}
exports.colores = colores;
