/*HEADER*/
const nav_responsivo = document.getElementById("nav-responsivo");
const hero = document.getElementById("hero");

const navResponsivo = (entradas, observador)=>{
    // console.log(entradas);
    // console.log(observador);
    if(entradas[0].isIntersecting == false){
        // nav_responsivo.style.backgroundColor = "#00f";
        nav_responsivo.classList.add("nav-responsivo-visible");
    }
    if(entradas[0].isIntersecting == true){
        // nav_responsivo.style.background = "none";
        nav_responsivo.classList.remove("nav-responsivo-visible");
    }
}

const observador = new IntersectionObserver(navResponsivo, {
    root: null,
    rootMargin: "0px",
    threshold: 1.0
});

observador.observe(hero);

/*OFERTAS*/
const flechas_down = document.querySelectorAll(".ofertas__item .flecha-down");
const texto_top = document.querySelector(".info__desplante-top .parrafo-top");
const info_top = document.querySelector(".info-top");
const texto_bottom = document.querySelector(".info__desplante-bottom .parrafo-bottom");
const info_bottom = document.querySelector(".info-bottom");
const cerrar = document.querySelectorAll(".ofertas__item .cerrar")

flechas_down.forEach((elem)=>{
    elem.addEventListener("click", (e)=>{
        if(e.target.id == "prepa"){
            texto_top.textContent = "En la Preparatoria RHEMA aprenderás a tomar decisiones, desarrollando conocimientos, habilidades y destrezas para que puedas definir tu futuro.";
            info_top.style.display = "block";
            e.target.style.display = "none";
            flechas_down[1].firstElementChild.style.display = "inline-block";
        }else if(e.target.id == "universidad"){
            texto_top.textContent = "Comienza una nueva etapa, elige tu carrera y vive haciendo lo que más te gusta. RHEMA cuenta con certificado por parte de la UAGro para todos nuestros futuros profesionistas.";
            info_top.style.display = "block";
            e.target.style.display = "none";
            flechas_down[0].firstElementChild.style.display = "inline-block";
        }else if(e.target.id == "maestrias"){
            texto_bottom.textContent = "Especializate con el más alto nivel académico y convierte en un líder. Maestrías y doctorados en diferentes áreas. Te invitamos a conocer el programa ideal para ti.";
            info_bottom.style.display = "block";
            e.target.style.display = "none";
            flechas_down[3].firstElementChild.style.display = "inline-block";
        }else if(e.target.id == "profesores"){
            texto_bottom.textContent = "Tus profesores te retarán a continuar y deliberadamente a planear y resolver problemas. Retors continuos en entornos diversos para forjar en ti la persona que estás llamado a ser.";
            info_bottom.style.display = "block";
            e.target.style.display = "none";
            flechas_down[2].firstElementChild.style.display = "inline-block";
        }
    });
});

cerrar[0].addEventListener("click", ()=>{
    info_top.style.display = "none";
    flechas_down[0].firstElementChild.style.display = "inline-block";
    flechas_down[1].firstElementChild.style.display = "inline-block";
});

cerrar[1].addEventListener("click", ()=>{
    info_bottom.style.display = "none";
    flechas_down[2].firstElementChild.style.display = "inline-block";
    flechas_down[3].firstElementChild.style.display = "inline-block";
})


/*NOTICIAS*/
const noticias = document.getElementById("noticias");
var contador = 0;

const crearArticulos = (img, notTitulo, notFecha)=>{
    const articulo = document.createElement("ARTICLE");
    const div = document.createElement("DIV");
    const imagen = document.createElement("IMG");
    const titulo = document.createElement("P");
    const fecha = document.createElement("P");
    const fai = document.createElement("I");

    imagen.setAttribute("src",img)
    titulo.textContent = notTitulo;
    fecha.textContent = notFecha;

    articulo.classList.add("noticia");
    titulo.classList.add("noticia__titulo");
    fecha.classList.add("noticia__fecha");
    fai.classList.add("fa-regular", "fa-clock");

    fecha.insertAdjacentElement("afterbegin", fai);
    div.appendChild(imagen);
    div.appendChild(titulo);
    div.appendChild(fecha);
    articulo.appendChild(div);

    return articulo;

}

const cargarNoticias = (entradas, observador)=>{
    // console.log(entradas);
    // console.log(observador);
    if(entradas[0].isIntersecting){
        obtenerArticulo(4);
    }
}

const observadorNoticias = new IntersectionObserver(cargarNoticias, {
    root : null,
    rootMargin : "0px",
    threshold : 1
})

const obtenerArticulo = async(num)=>{
    const encap = await fetch("noticias.txt");
    const array = await encap.json();
    const fragmento = document.createDocumentFragment();

    for(let i = 0; i < num; i++){
        if(array[contador] != undefined){
            const linea = document.createElement("HR");
            linea.classList.add("linea")
            const articulo = crearArticulos(array[contador].img, array[contador].titulo, array[contador].fecha);
            fragmento.appendChild(articulo);
            fragmento.appendChild(linea);
            contador++;
            // console.log(array[elem].img)
            if(i == num -1){
                observadorNoticias.observe(articulo);
            }
        }
    }
    noticias.appendChild(fragmento);
}

window.addEventListener("load", ()=>{
    obtenerArticulo(3);
});
