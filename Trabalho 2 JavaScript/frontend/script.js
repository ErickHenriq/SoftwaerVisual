var url = 'http://localhost:3000/'

// FUNÇÕES TERNOS --- 

function cadastrarTerno(){ //validação dos inputs
    if(!validaModelo('modelo')){
        return
    }

    if(!validaCor('cor')){
        return
    }

    if(!validaTamanho('tamanho')){
        return
    }

	let body = {
		//TERNO
		'Modelo':            	document.getElementById('modelo').value,
		'Cor':               	document.getElementById('cor').value,
		'Tamanho':           	document.getElementById('tamanho').value,
		'Status':          	 	document.getElementById('status').value,
	};
	
    fetch(url + "terno/cadastrar",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})

	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})

	.then((output) =>
	{
		console.log(output)
		alert('Terno cadastrado com sucesso!')
	})

	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possivel cadastrar o terno!')
	})

}
    //json

    


function validaModelo(id)
{
    let divModelo = document.getElementById(id)
	
	if(divModelo.value.trim().length >= 0)
	{
	    divModelo.classList.remove('erro-input')
	    return true
	}
	else
	{
		if(!divModelo.classList.contains('erro-input'))
		{
			divModelo.classList.add('erro-input')
		}
		return false
	}
}

function validaCor(id){
    let divCor = document.getElementById(id)
    if(divCor.value.trim().length >= 0)
    {
    divCor.classList.remove('erro-input')
    return true
    }
    else
    {
        if(!divCor.classList.contains('erro-input'))
        {
            divCor.classList.add('erro-input')
        }
        return false
    }
}

function validaTamanho(id){
    let divTamanho = document.getElementById(id)
    if(divTamanho.value.trim().length >= 0)
    {
    divTamanho.classList.remove('erro-input')
    return true
    }
    else
    {
        if(!divTamanho.classList.contains('erro-input'))
        {
            divTamanho.classList.add('erro-input')
        }
        return false
    }
}

function listarTerno(){
    fetch(url + 'ternos')
    .then(response => response.json())
	.then((ternos) => {
        let listaTernos = document.getElementById('lista-ternos')

        while(listaTernos.firstChild){
            listaTernos.removeChild(listaTernos.firstChild)
        }

        for(let terno of ternos){
            let divTernos = document.createElement('div')
            divTernos.setAttribute('class', 'form')

            let divModelo = document.createElement('input')
			divModelo.placeholder = 'Modelo'
			divModelo.value = terno.modelo
			divTernos.appendChild(divModelo)

            let divCor = document.createElement('input')
			divCor.placeholder = 'Cor'
			divCor.value = terno.cor
			divTernos.appendChild(divCor)

            let divTamanho = document.createElement('input')
			divTamanho.placeholder = 'Tamanho'
			divTamanho.value = terno.tamanho
			divTernos.appendChild(divTamanho)

            //botão remove
            let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerTerno(terno.id)
			btnRemover.style.marginRight = '5px'

            //botão atualizar
            let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarTerno(terno.id, divModelo, divCor, divTamanho)
			btnAtualizar.style.marginLeft = '5px'

            //div com botoes
            let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divTernos.appendChild(divBotoes)

            listaTernos.appendChild(divTernos)
        }
    })
}

function atualizarTerno(id, divModelo, divCor, divTamanho)
{
	let body =
	{
		'Modelo': divModelo.value,
		'Cor': divCor.value,
		'Tamanho': divTamanho.value
	}
	
	fetch(url + "terno/atualizar/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarTerno()
		console.log(output)
		alert('Terno Atualizado!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar terno')
	})
}

function removerTerno(id)
{
	fetch(url + 'terno/deletar/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarTerno()
		console.log(output)
		alert('Terno Removido!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o terno')
	})
}


function option()
{
	
	fetch(url + 'ternos')
	.then(response => response.json())
	.then((ternos) =>
	{
		let selTernos = document.getElementById('option-ternos')
				
		for(let terno of ternos)
		{
			let optTerno = document.createElement('option')
			optTerno.innerHTML = terno.modelo
			optTerno.value = terno.id
			selTernos.appendChild(optTerno)
		}
	})
}

// FUNÇÕES LOCADORES ---

function cadastrarLocador(){ //validação dos inputs
    if(!validaCpf('cpf')){
        return
    }

    if(!validaNomeLocador('nome')){
        return
    }

	let body = {
		//LOCADOR
		'Cpf':            		document.getElementById('cpf').value,
		'Nome':           		document.getElementById('nome').value,
	};
	

    //json


    fetch(url + "locador/cadastrar",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})

	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})

	.then((output) =>
	{
		console.log(output)
		alert('Locador cadastrado com sucesso!')
	})

	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possivel cadastrar o Locador!')
	})
}

function validaCpf(id){
    let divCpf = document.getElementById(id)
	if(divCpf.value.trim().length >= 0)
	{
	    divCpf.classList.remove('erro-input')
	    return true
	}
	else
	{
		if(!divCpf.classList.contains('erro-input'))
		{
			divCpf.classList.add('erro-input')
		}
		return false
	}
}

function validaNomeLocador(id){
    let divNome = document.getElementById(id)
    if((divNome.value.trim().length >= 0))
    {
    divNome.classList.remove('erro-input')
    return true
    }
    else
    {
        if(!divNome.classList.contains('erro-input'))
        {
            divNome.classList.add('erro-input')
        }
        return false
    }
}

function listarLocador(){
    fetch(url + 'locador')
    .then(response => response.json())
	.then((locadores) => {
        let listaLocadores = document.getElementById('lista-locadores')

        while(listaLocadores.firstChild){
            listaLocadores.removeChild(listaLocadores.firstChild)
        }

        for(let locador of locadores){
            let divLocadores = document.createElement('div')
            divLocadores.setAttribute('class', 'form')

            let divCpf = document.createElement('input')
			divCpf.placeholder = 'Cpf'
			divCpf.value = locador.cpf
			divLocadores.appendChild(divCpf)

            let divNome = document.createElement('input')
			divNome.placeholder = 'Nome'
			divNome.value = locador.nome
			divLocadores.appendChild(divNome)

            //botão remove
            let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerLocador(locador.id)
			btnRemover.style.marginRight = '5px'

            //botão atualizar
            let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarLocador(locador.id, divCpf, divNome)
			btnAtualizar.style.marginLeft = '5px'

            //div com botoes
            let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divLocadores.appendChild(divBotoes)

            listaLocadores.appendChild(divLocadores)
        }
    })
}

function atualizarLocador(id, divCpf, divNome)
{
	let body =
	{
		'Cpf': divCpf.value,
		'Nome': divNome.value,
	}
	
	fetch(url + "locador/atualizar/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarLocador()
		console.log(output)
		alert('Locador Atualizado!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar Locador')
	})
}

function removerLocador(id)
{
	fetch(url + 'locador/deletar/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarLocador()
		console.log(output)
		alert('Locador Removido!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível Remover o Locador')
	})
}


function option()
{
	
	fetch(url + 'locador')
	.then(response => response.json())
	.then((locadores) =>
	{
		let selLocadores = document.getElementById('option-locadores')
				
		for(let locador of locadores)
		{
			let optLocador = document.createElement('option')
			optLocador.innerHTML = Locador.cpf
			optLocador.value = locador.id
			selLocadores.appendChild(optLocador)
		}
	})
}



// FUNÇÕES LOCAÇÕES 

function cadastrarLocacao(){
	if(!validaidLocador('idLocador')){
		return
	}

	if(!validaidTerno('idTerno')){
		return
	}

let body = {
	/*TERNO
	'Modelo':            	document.getElementById('modelo').value,
	'Cor':               	document.getElementById('cor').value,
	'Tamanho':           	document.getElementById('tamanho').value,
	'Status':          	 	document.getElementById('status').value,

	//LOCADOR
	'Cpf':            		document.getElementById('cpf').value,
	'Nome':           		document.getElementById('nome').value,
*/
	//LOCACAO
	'IdLocador':            document.getElementById('idLocador').value,
	'IdTerno':           	document.getElementById('idTerno').value

};

fetch(url + "locacao/cadastrar/",
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})

	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})

	.then((output) =>
	{
		console.log(output)
		alert('Locação cadastrada com sucesso!')
	})

	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possivel cadastrar a locação!')
	})

}
function validaidLocador(id){
	let divIdLocador = document.getElementById(id)
	if(divIdLocador.value.trim().length >= 0)
	{
		divIdLocador.classList.remove('erro-input')
		return true
	}
	else
	{
		if(!divIdLocador.classList.contains('erro-input'))
		{
			divIdLocador.classList.add('erro-input')
		}
		return false
	}
}

function validaidTerno(id){
	let divIdTerno = document.getElementById(id)
	if(divIdTerno.value.trim().length >= 0)
	{
		divIdTerno.classList.remove('erro-input')
		return true
	}
	else
	{
		if(!divIdTerno.classList.contains('erro-input'))
		{
			divIdTerno.classList.add('erro-input')
		}
		return false
	}
}

function listarLocacoes(){
    fetch(url + 'locacao')
    .then(response => response.json())
	.then((locacoes) => {
        let listaLocacoes = document.getElementById('lista-locacoes')

        while(listaLocacoes.firstChild){
            listaLocacoes.removeChild(listaLocacoes.firstChild)
        }

        for(let locacao of locacoes){
            let divLocacoes = document.createElement('div')
            divLocacoes.setAttribute('class', 'form')

            let divIdLocador = document.createElement('input')
			divIdLocador.placeholder = 'IdLocador'
			divIdLocador.value = locacao.idLocador
			divLocacoes.appendChild(divIdLocador)

            let divIdTerno = document.createElement('input')
			divIdTerno.placeholder = 'IdTerno'
			divIdTerno.value = locacao.idTerno
			divLocacoes.appendChild(divIdTerno)

            //botão remove
            let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerLocacao(locacao.id)
			btnRemover.style.marginRight = '5px'

            //botão atualizar
            let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarLocacao(locacao.id, divIdLocador, divIdTerno)
			btnAtualizar.style.marginLeft = '5px'

            //div com botoes
            let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divLocacoes.appendChild(divBotoes)

            listaLocacoes.appendChild(divLocacoes)
        }
    })
}

function atualizarLocacao(id, divIdLocador, divIdTerno)
{
	let body =
	{
		'IdLocador': divIdLocador.value,
		'IdTerno': divIdTerno.value,
	}
	
	fetch(url + "locacao/atualizar/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarLocacoes()
		console.log(output)
		alert('Locação Atualizada!')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar Locação!')
	})
}

function removerLocacao(id)
{
	fetch(url + 'locacao/deletar/' + id,
	{
		'method': 'DELETE',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarLocacoes()
		console.log(output)
		alert('Locação Removida!')
	})
	.catch((error) =>
	{	
		listarLocacoes()
		console.log(error)
		alert('Não foi possível remover a Locação!')
	})
}


function option()
{
	
	fetch(url + 'locacao')
	.then(response => response.json())
	.then((locacoes) =>
	{
		let selLocacoes = document.getElementById('option-locacoes')
				
		for(let locacao of locacoes)
		{
			let optLocacao = document.createElement('option')
			optLocacao.innerHTML = locacao.idLocador
			optLocacao.value = locacao.id
			selLocacoes.appendChild(optLocacao)
		}
	})
}

