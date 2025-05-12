

const contenedorCuadros = document.querySelector("section");
const formulario = document.querySelector("form");
const medidas = document.querySelectorAll(`input [type="text"]`)


function cuadro({id, ancho, alto}){
    let cuadro = document.createElement("div");
    cuadro.classList.add("cuadro")
    cuadro.style.width= ancho + "px";
    cuadro.style.height= alto + "px";
    cuadro.style.backgroundColor= color;
    
    return cuadro;
}

function color(){
    return `rgb(${[0,0,0].map(()=> Math.floor(Math.random()* 256)).join(",")})`;
}

etch("/cuadros")
.then(respuesta => respuesta.json())
.then(cuadros => {
    cuadros.forEach( objCuadro => {
        contenedor.appendChild(cuadro(objCuadro));
    })
});

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    let ancho = Number(medidas[0].value);
    let alto = Number(medidas[1].value);
    let color = colorCuadro();

    fetch("/nuevo",{
        method : "POST",
        body : JSON.stringify({ancho,alto,color}),
        headers : {
            "Content-type" : "application/json"
        }
    })
    .then(respuesta => respuesta.json())
    .then(({error,id}) => {
        if(!error){
            contenedor.appendChild(cuadro({id,ancho,alto,color}));

            return medidas.forEach( input => input.value = "");
        }
        console.log("..error");
    });


});

