let inquirer = require('inquirer');
const request = require("request-promise");
export class prompTemplates {
    private choices: string[] = new Array();
    private mapaDatos = new Map();
    private prompts = [
        {
            type: "list",
            name: "plantillas",
            message: "Seleccione una empresa: ",
            choices: this.choices
        }
    ];
    constructor() {
        this.mapaDatos.set("1",{
            nombre: "Login 1",
            template: "l1"
        });
        this.mapaDatos.set("2",{
            nombre: "Login 2",
            template: "l2"
        });
        for(let [clave, valor] of this.mapaDatos){
            this.choices.push(clave + ".- " + valor.nombre);
        }
        this.prompts[0].choices = this.choices;
    }

    async generarPrompts() {
        let resp = await inquirer.prompt(this.prompts).then(async (props: any) => {
            let id = props.plantillas.split(".-")[0];
            return this.mapaDatos.get(id).template;
        },
            (err: any) => {
                console.log(err);
                return null;
            }
        );
        return resp;
        
    }

}