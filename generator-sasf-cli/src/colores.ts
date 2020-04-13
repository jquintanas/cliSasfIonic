const request = require("request-promise")
import { metadalaColores } from "./metadataColores";
export class colores {
    private usuario: Number;
    private url: string = "https://api-sasf.herokuapp.com/api/colores/";
    private datosColores: metadalaColores[];
    constructor(usuario: Number) {
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

    async buscarColores(): Promise<any> {
        return await request({
            uri: this.url + this.usuario,
            json: true,
        }).then((data: any) => {
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
        }, (err: any) => {
            console.log(err);
            return this.datosColores;
        });
    }
}