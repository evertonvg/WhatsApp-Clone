class Format{
	static getCamelCase(text){ //posso chamar a função sem instanciar o objeto
		//envio os ids com traços no text
		let div = document.createElement('div'); //criando um elemento html so pra usar o dataset
		//não é necessario renderizar a div
		div.innerHTML = `<div data-${text}="id"></div>`; //coloca dentro da div todas as divs com os id's 
		//data-${text}="id" significa que no texto onde tem traço será colocado maiusculo e se tornará o id do elemento
		return Object.keys(div.firstChild.dataset)[0]; //retorna as chave do primeiro elemento ja em camel case
		//FirstChild = primeiro filho do elemento div... que no caso são as divs com id
	}
}