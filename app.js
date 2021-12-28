require("dotenv").config()
const { bgYellow } = require("colors");
const { leerInput, inquirerMenu, pausar, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./Models/Busqueda");

const main = async () => {
    const busquedas = new Busquedas()
    let opt

    do {


        opt = await inquirerMenu()

        switch (opt) {
            case 1:
                //mostrar mensaje
                const termino = await leerInput("ciudad")
                // Buscar los lugar
                
                const lugares = await busquedas.ciudad(termino)
                
                //Seleccionar los lugares
                
                const id = await listarLugares(lugares)
                // console.log(lugarSel)
                const lugarSel = lugares.find(lugar => lugar.id === id)
                //guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre)
               
                console.log(lugarSel.longitud)
                //al seleccionar muestra los datos del clima

                const clima = await busquedas.climaLugar(lugarSel.latitud,lugarSel.longitud)

                //Mostara resultdaos
                console.clear()
                console.log(`\nInformacion de la ciudad\n`.green)
                console.log(`Ciudad:`,lugarSel.nombre.green)
                console.log(`Latitud:`,lugarSel.latitud)
                console.log(`Longitud:`,lugarSel.longitud)
                console.log(`tempreratura:`,clima.temp)
                console.log(`Minima:`,clima.min)
                console.log(`Maxima:`,clima.max)
                console.log(`Cielo:`,clima.description.green)
                break;
            case 2:
                 busquedas.historial.forEach((lugar,i)=>{
                     let indice = `${i + 1}`.green
                     console.log(`${indice}.${lugar}`)
                 })
                break;
            case 3:

                break;

            default:
                break;
        }


        if (opt !== 0) {
            await pausar()
        }

    } while (opt !== 0);
}
main()