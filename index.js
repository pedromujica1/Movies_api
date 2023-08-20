//Importando OpenAI package
import OpenAI from 'openai';

import dotenv from 'dotenv'

dotenv.config()

//Configurando chave da API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

//Função para gerar imagens
async function gerarImagens (prompt,tamanhoImagem) {
	const imageGenaration = await openai.images.generate(
	{
		prompt: prompt,
		n: 1,
		size: tamanhoImagem
	
	}).then((data) => {
		console.log(data);
		return data;
	});
	
}

//Exemplo de chamada de função
gerarImagens("o senhor dos aneis","1024x1024");
	