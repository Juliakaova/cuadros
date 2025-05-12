import { readFile,writeFile } from "fs";


export function read(){
    return new Promise((ok,ko) => {
        readFile("./cuadros.json", (error,contenido) => {
            if(!error){
                return ok(JSON.parse(contenido.toString()));
            }
            ko();
        });
    });
}

export function createCuadro(ancho, alto, color){
    return new Promise((ok,ko)=> {
        read()
        .then(cuadros => { // sale de lo que retorna read(), que es el json 
            let id = cuadros.length> 0? cuadros[cuadros.length-1].id + 1 : 1;
            cuadros.push({id,ancho,alto,color});
            writeFile("./cuadros.json",JSON.stringify(cuadros), error =>{
                if(!error){
                    return ok(id);
                }
                ko();
            });
        })
        .catch(() => ko());
    });
}



export function deleteCuadro(){
    return new Promise((ok,ko)=> {
        read()
        .then(cuadros => {
            let antes = cuadros.length;
            cuadros = cuadros.filter(cuadro => cuadro.id != id);
            writeFile("./cuadros.json",JSON.stringify(cuadros), error =>{
                if(!error){
                    return ok(antes - cuadros.length);
                }
                ko();
            });
        })
        .catch(() => ko());
    });

}