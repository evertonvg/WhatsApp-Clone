class WhatsAppController{

	constructor(){

		this.elementsPrototype(); //jquery na mao

		this.loadElements(); //pega automaticamente todos os id's

		this.initEvents(); //começa os eventos


	}

	loadElements(){ //pega todos os id's da pagina transformados em camelCase

		this.el= {}; //objeto para receber cada um das propriedades id

		document.querySelectorAll('[id]').forEach(element=>{ //passa elemento por elemento que possui id

			
			this.el[Format.getCamelCase(element.id)] = element; //colocara cada elemento id em formato camel case dentro do vetor
			//função vinda do arquivo Format, converte os ids com traços em camelCase
		});
	}

	elementsPrototype(){ //jquery na mão
		//precisa encapsular....não usar arrowfunction
		Element.prototype.hide = function(){

			this.style.display = 'none';
			return this; //serve para concatenar funções sem precisar repetir...retorna e executa

		}

		Element.prototype.show = function(){

			this.style.display = 'block';
			return this;
			
		}

		Element.prototype.toggle = function(){

			this.style.display = (this.style.display === 'none') ? 'block' : 'none';
			return this;
			
		}

		//somente o click esta funcionando
		Element.prototype.on = function(events,fn){ //recebe os eventos e a função q tem q executar

			events.split(' ').forEach(event=>{ //recebe os eventos e da um split no espaço

				this.addEventListener(event, fn); //passa a função que quero e o evento
				
			});

			return this;
			
		}
		//modo padrão = app.el.app.style.width='100%' um pra cada
		//modo novo = app.el.app.css({width:'100%',height:'100%'}) quantos eu quiser

		//css
		Element.prototype.css = function(styles){ //prototipo seria escrever algo q seria predefinido de unm jeito mais curto
			for (let name in styles){
				this.style[name] = styles[name];
				return this;
			}
		}

		//adicionar e remover classes
		Element.prototype.addClass = function(name){
			this.classList.add(name);
			return this;
		}

		Element.prototype.removeClass = function(name){
			this.classList.remove(name);
			return this;
		}

		Element.prototype.toggleClass = function(name){
			this.classList.toggle(name);
			return this;
		}

		Element.prototype.hasClass = function(name){
			return this.classList.contains(name);
		}

		HTMLFormElement.prototype.getForm = function(){  //trabalha diretamente com formularios

			return new formData(this); //o formulario q esta passando

		}

		HTMLFormElement.prototype.toJSON = function(){ //transofrma em json pra salvar no firebase

			let json = {};

			this.getForm().forEach((value,key)=>{

				json[key] = value;

			});

			return json;

		}
	}

	initEvents(){
		this.el.myPhoto.on('click', e=>{ //botão de perfil

			this.closeAllLeftPanel();

			this.el.panelEditProfile.show(); //antes de abrir tem q dar um show

			setTimeout(()=>{

				this.el.panelEditProfile.addClass('open'); //abre o painel de editar perfil adicionando uma classe css

			},250);	

		});

		this.el.btnNewContact.on('click',e=>{ //botão de novo contato

			this.closeAllLeftPanel();

			this.el.panelAddContact.show();

			setTimeout(()=>{

				this.el.panelAddContact.addClass('open'); //abre o painel de adicionar contato adicionando uma classe css

			},250); //serve para conseguir fazer ol efeito deslizante

			

		});

		this.el.btnClosePanelEditProfile.on('click',e=>{

			this.el.panelEditProfile.removeClass('open'); //fecha o painel de editar perfil

		});

		this.el.btnClosePanelAddContact.on('click',e=>{

			this.el.panelAddContact.removeClass('open');

		});

		this.el.photoContainerEditProfile.on('click',e=>{ //abre o painel de abrir photo para upload

			this.el.inputProfilePhoto.click(); //abre o input invisivel

		});

		this.el.inputNamePanelEditProfile.on('keypress',e=>{ //mudar o nome quando estiver digitando
			if(e.key === 'Enter'){

				e.preventDefault(); //cancela oe vento padrão

				this.el.btnSavePanelEditProfile.click(); //ativa o botão de salvar

			}
		});

		this.el.btnSavePanelEditProfile.on('click',e=>{

			console.log(this.el.inputNamePanelEditProfile.innerHTML); //porenquanto so recupera o valor
		});

		this.el.formPanelAddContact.on('submit',e=>{ //quando o formulario for recuperado

			e.preventDefault(); //cancela oe vento padrão

			let formData = new FormData(this.el.formPanelAddContact); //recebe so campos do formulario

		});


	}

	closeAllLeftPanel(){ //fecha os paineis da esquerda

		this.el.panelAddContact.hide();

		this.el.panelEditProfile.hide();

	}

}