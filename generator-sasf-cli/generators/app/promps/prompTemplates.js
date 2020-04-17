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
let inquirer = require('inquirer');
const request = require("request-promise");
class prompTemplates {
    constructor() {
        this.choices = new Array();
        this.mapaDatos = new Map();
        this.prompts = [
            {
                type: "list",
                name: "plantillas",
                message: "Seleccione una empresa: ",
                choices: this.choices
            }
        ];
        this.mapaDatos.set("1", {
            nombre: "Login 1",
            template: "l1"
        });
        this.mapaDatos.set("2", {
            nombre: "Login 2",
            template: "l2"
        });
        for (let [clave, valor] of this.mapaDatos) {
            this.choices.push(clave + ".- " + valor.nombre);
        }
        this.prompts[0].choices = this.choices;
    }
    generarPrompts() {
        return __awaiter(this, void 0, void 0, function* () {
            let resp = yield inquirer.prompt(this.prompts).then((props) => __awaiter(this, void 0, void 0, function* () {
                let id = props.plantillas.split(".-")[0];
                return this.mapaDatos.get(id).template;
            }), (err) => {
                console.log(err);
                return null;
            });
            return resp;
        });
    }
}
exports.prompTemplates = prompTemplates;
