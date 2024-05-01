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
import UserModel from "./models/usuario.model.js";

const {mongo_url, puerto} = configObject; 

// Conexion a MONGO DB

await mongoose.connect(mongo_url)
    .then(() => {console.log("Conectado a Mongo DB");})
    .catch((error) => {console.log("Error de Conexion a Mongo DB", error);})

//Rutas

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send("Error del servidor")
    }
});

app.listen(puerto, () => {
    console.log(`Conectado en http://localhost:${puerto}`);
})

//6) Child Process: 

// function operacionCompleja() {
//     let resultado = 0; 

//     for(let i = 0; i <5e9; i++){
//         resultado += i; 
//     }

//     return resultado; 
// }

// app.get("/suma", (req, res) => {
//     const resultado = operacionCompleja();
//     res.send(`El resultado de la operacion: ${resultado}`);
// })

//Pasitos para lograr el forkeo: 

//1) Separamos la función que trae problemas a otro modulo.
//2) La modificamos y la dejamos disponible para cuando el padre la solicite. 
//3) Ejecutamos la ruta. 

import {fork} from "child_process";
//No hace falta instalar nada, ya es un proceso nativo. 

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionesComplejas.js");
    child.send("iniciando"); //Acá el proceso padre le envia un mensaje al hijo. 
    child.on("message", resultado => {
        res.send(`El resultado de la operacion es: ${resultado} `);
    })
})