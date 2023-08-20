
//criar referências ao elemento da pagina
const frm = document.querySelector("form");
const data = document.getElementById("inData")
//Importando modulo com a chave da api
const config = require('./config.js')


function gerarFoto(url) {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate); // "17-6-2022"
    
}

frm.addEventListener("submit",(e) => {
    
    e.preventDefault();

    const data_str = String(data.value);
    const key = config.NASA_KEY
    
    //String da data
    console.log(data_str)

    //URL da requisição
    const url = `https://api.nasa.gov/planetary/apod?api_key=${key}&date=${data_str}`;

    gerarFoto(url)

    




});