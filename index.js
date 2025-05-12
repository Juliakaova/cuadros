import express from "express";
import { deleteCuadro, createCuadro, read } from "./repo.js";

const servidor = express();


servidor.use(express.json());

servidor.use(express.static("./front"));

servidor.get("/cuadros", async (peticion,respuesta) => {
    try{
        respuesta.json(await read());
    }catch(error){
        respuesta.status(500);
        respuesta.json({error: "error en la base de datos"});
    }
});

servidor.post("/nuevo", async (peticion,respuesta) => {
    try{
        let {ancho,alto,color} = peticion.body;

        let id = await crearCuadro(ancho,alto,color);

        respuesta.json({id});

    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en base de datos" });
    }
});

servidor.delete("/borrar", async (peticion,respuesta) => {
    try{
        let {id} = peticion.body;

        let cantidad = await borrarCuadro(id);

        respuesta.json({ resultado : cantidad ? "ok" : "ko" });

    }catch(error){
        respuesta.status(500);
        respuesta.json({ error : "error en base de datos" });
    }
});

servidor.listen(3000);