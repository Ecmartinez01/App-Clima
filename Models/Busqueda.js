
const fs = require("fs")
const axios = require('axios')
class Busquedas {
    historial = ["bogota", "paris", "medellin", "san francisco"]
    dbPath ='./db/dataBase.json'
    constructor() {
        this.leerBd()
    }
    get paramsMapBox() {
        return {
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY//'pk.eyJ1IjoiZWR3aW5tdHowMSIsImEiOiJja3dwNnFvMGQwOXI0Mm5vNHRqM2JlZ2FyIn0.FVFEdzNAUQaIOF1kaAjJpg'  
        }
    }
    get paramsWhaterApi() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }
    async ciudad(lugar = '') {
        try {
            // peticion http
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const res = await instancia.get()
            // const resp= await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/bogota.json?language=es&access_token=pk.eyJ1IjoiZWR3aW5tdHowMSIsImEiOiJja3dwNnFvMGQwOXI0Mm5vNHRqM2JlZ2FyIn0.FVFEdzNAUQaIOF1kaAjJpg")
            return res.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                longitud: lugar.center[0],
                latitud: lugar.center[1]
            }))

        } catch (error) {
            return []
        }
    }
    async climaLugar(lat, long) {
        try {
            //instacia de axios
            const intaciaClima = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=es`,
                params: this.paramsWhaterApi
                
            })
            //res.data

            const resClima = await intaciaClima.get()
            //  console.log(resClima) 
            const { weather, main } = resClima.data
            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        }

        catch (error) {
            console.log(error)
        }

    }
    agregarHistorial(lugar = ''){

        //EVITAR DUPLICADOS
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return
        } 
        this.historial = this.historial.splice(0,5)

        this.historial.unshift(lugar.toLocaleLowerCase())
        this.guardarBd()        
    }
    guardarBd(){
        const payload={
            historial:this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))
    }
    leerBd(){
        if(!fs.existsSync(this.dbPath)){
            return
        }
     const info = fs.readFileSync(this.dbPath,{encoding:'utf-8'})
     const data = JSON.parse(info)
     this.historial = data.historial
    }
}
module.exports = Busquedas