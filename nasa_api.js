//4c6cjMgLFIGafGCbJhm7fQ9bpsqfN9HEJbW5XANf

//criar referências ao elemento da pagina
const data = document.getElementById("inData")
const resp1 = document.querySelector("h3");
const foto_atual = document.getElementById("inFotoAtual")


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

//Função para fazer o fetch e gerar os dados em json
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
   
    document.getElementById("inTituloResponse").textContent = response_data.title;
    document.getElementById("inDataResponse").textContent = response_data.date;
    document.getElementById("inImage").src = response_data.hdurl;
    document.getElementById("inExplicacao").textContent= response_data.explanation;
}
//limpar formulario
function limparDados(){
    document.getElementById("inTituloResponse").value = "";
    document.getElementById("inImage").value = "";
    document.getElementById("inDataResponse").value = "";
    document.getElementById("inExplicacao").value = "";
}

//Gera foto diária
document.getElementById("inFotoAtual").addEventListener("click",(e) => {
    e.preventDefault()
    console.log
    //Fetch que retorna JSON
    //Default da consulta da API é o dia atual
    gerarFoto("https://api.nasa.gov/planetary/apod?api_key=4c6cjMgLFIGafGCbJhm7fQ9bpsqfN9HEJbW5XANf")
    .then(response => response.json())
    .then(data => {
    console.log(data)
    preencherDados(data)
    });
    


})

//Gera imagem de acordo com a data inserida após clicar no botão
document.getElementById("btnImagem").addEventListener("click",(e) => {
    
    e.preventDefault();

    const data_str = String(data.value);
    const api_key = "4c6cjMgLFIGafGCbJhm7fQ9bpsqfN9HEJbW5XANf";

    
    //String da data
    console.log(data_str)

    //URL da requisição
    const url = `https://api.nasa.gov/planetary/apod?api_key=${api_key}&date=${data_str}`;


    if (VerificarData(data_str) == true) {
        gerarFoto(url)
    }
    else{console.log("Data errada")}

});

