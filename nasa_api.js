//IMPORTANDO CHAVE API DE OUTRO ARQUIVO
import { key } from "./config.js";

//criar referências ao elemento da pagina
const frm = document.querySelector("form");
const data = document.getElementById("inData")
const resp1 = document.querySelector("h3");


//Função para verificar se data é válida
function VerificarData(data) {
    const data_atual = new Date();
    let data_inserida = new Date(data)

    if (data_inserida>data_atual){
        resp1.innerText=`Você ainda não pode viajar para o futuro! hahaha`;
        limparDados()
        return false
    }
    return true
}

async function gerarFoto(url) {
 

    //Transformando dados do request em JSON
    const dados = await fetch(url);
        
    //body do request
    console.log(dados)

    const dados_json = await dados.json();
    //body do request em json
    console.log(dados_json)
    
    //Verificando se request foi realizado com sucesso
    if(dados_json.status == 200 && dados_json.readyState == 4){
        resp1.innerText=`Algo deu errado no request. Tente novamente!`;
    }
    else{preencherDados(dados_json)}
}

//preencher dados
function preencherDados(response_data){
    document.getElementById("title").textContent = response_data.title;
    document.getElementById("date").textContent = response_data.date;
    document.getElementById("pic").src = response_data.hdurl;
    document.getElementById("explanation").textContent = response_data.explanation;
}
//limpar formulario
function limparDados(){
    document.getElementById("title").textContent = "";
    document.getElementById("date").textContent = "";
    document.getElementById("pic").src = "";
    document.getElementById("explanation").textContent = "";
}


frm.addEventListener("click",(e) => {
    
    e.preventDefault();

    const data_str = String(data.value);
    const api_key = key()

    
    //String da data
    console.log(data_str)

    //URL da requisição
    const url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${data_str}`;


    if (VerificarData(data_str) == true) {
        gerarFoto(url)
    }
    else{console.log("Data errada")}

});

