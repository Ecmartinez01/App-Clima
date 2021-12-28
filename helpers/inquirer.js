require('colors')
const inquirer = require('inquirer')

const preguntas =[
    {
        type: "list",
        name:"opcion",      
        message:"¿Que deseas hacer?",    
        choices:[
            {
                value:1,
                name:`${"1".green}. Buscar ciudad`
            },
            {
                value:2,
                name:`${"2".green}. Historial `
            },
            {
                value:0,
                name:`${"3".green}. Salir`
            },
        ]
    }
]
const inquirerMenu = async()=>{

     console.log("====================".green)
     console.log("Seleccione una opcion".white)
     console.log("====================\n".green)
     /// con {option } desestructura el array con el obgeto option que tiene el valor 
    
    
     const {opcion} = await inquirer.prompt(preguntas)
    return opcion
    
}
const pausar = async()=>{
    // se crea la constamte respuesta en un array del parametro promt que obtiene los datos de salida
    const respuesta = [
        {
            type: "input",
            name:"enter",
            message:`Presione ${"ENTER".green} para continuar`
        }
    ]
    //pasamos el valor por el parametro
    await inquirer.prompt(respuesta) 
}
const leerInput =async(message)=>{
    const msj = [
        {
            type:'input',
            name:'ciudad',
            message,
            validate(value){
                if (value.length === 0){
                    return "porfavor ingrese un valor"
                }
                return true
            }
        }
    ]
    //desctructurcion de const mjs
    const {ciudad} = await inquirer.prompt(msj)
    return ciudad
}
const listarLugares = async(lugares =[])=>{
    
    const choices = lugares.map((lugar,i)=>{
        
        const indice = `${i +1}`.green

        return {
            value: lugar.id,
            name:`${indice} ${lugar.nombre}`
        }
    })
    choices.unshift({
        value:"0",
        name:`0.`.green + "Cancelar"
    })
    const preguntas =[
        {
            type:"list",
            name: "id",
            message :"Seleccione lugar:",
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas)
    return id
}

const confirmar = async(message)=>{
    const question = [
        {
            type:"confirm",
            name:"ok",
            message
        }
    ]
    const {ok} = await inquirer.prompt(question)
    return ok
}

const mostrarListadoChecklist = async(tareass =[])=>{
    
    const choices = tareass.map((tarea,i)=>{
        const indice = `${i +1}`.green
        return {
            value: tarea.id,
            name:`${indice} ${tarea.descripcion}`,
            checked:(tarea.creadoen)? true : false
        }
    })
    const preguntis =[
        {
            type:"checkbox",
            name: "ids",
            message:"Selecciones",
            choices
        } 
    ]
    
    const ids = await inquirer.prompt(preguntis)

    
    return ids
}
//exportamos los metodos o funciones mediante module.exports
module.exports ={
    inquirerMenu,
    pausar,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist  
}