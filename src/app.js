console.log("hola mundo");
//console.log(process.cwd());
//retorna el directoria actual del proceso

//console.log(process.pid);
//Obtengo el ID del proceso en el sistema operativo. 

//console.log(process.memoryUsage()); 
//Me retorna el valor en bytes. 
//Cantidad de momoria que usa el proceso.

//console.log(process.version); 
//Si quiero conocer la versión del Proceso: 
//Version de Node. 

//process.exit(); 
//Esto finaliza el proceso. 

// Manejo de argumentos en la consola. 
//console.log(process.argv);
//Me retorna un array con todos los argumentos que yo paso en la consola. 

import express from "express";
import mongoose from "mongoose";
const app = express(); 
import configObject from "./config/config.js";

const {mongo_url, puerto} = configObject; 

app.get("/", (req, res) => {
    res.send("Conectado")
});

app.listen(puerto, () => {
    console.log(`Conectado en http://localhost:${puerto}`);
})