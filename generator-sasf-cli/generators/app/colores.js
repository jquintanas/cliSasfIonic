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
        this.usuario = usuario;
        this.datosColores = new Array();
        this.datosColores.push({
            esPrimario: true,
            color: "#428cff",
            colorRGB: "66,140,255",
            contraste: "#ffffff",
            contrasteRGB: "255,255,255",
            shade: "#3a7be0",
            tint: "#5598ff",
            font: "https://fonts.gstatic.com/s/girassol/v1/JTUUjIo_-DK48laaNB9KxWs.woff2",
        });
        this.datosColores.push({
            esPrimario: false,
            color: "#50c8ff",
            colorRGB: "80,200,255",
            contraste: "#ffffff",
            contrasteRGB: "255,255,255",
            shade: "#46b0e0",
            tint: "#62ceff",
            font: "",
        });
    }
    buscarColores() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield request({
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
                        this.datosColores[i].esPrimario = data[i].esPrimario;
                        this.datosColores[i].font = data[i].font;
                    }
                }
                return this.datosColores;
            }, (err) => {
                console.log(err);
                return this.datosColores;
            });
        });
    }
}
exports.colores = colores;
