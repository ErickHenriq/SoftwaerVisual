var url = 'http://localhost:3000/'

let body = {
	//TERNO
	'Modelo':            	document.getElementById('modelo').value,
	'Cor':               	document.getElementById('cor').value,
	'Tamanho':           	document.getElementById('tamanho').value,
	'Status':          	 	document.getElementById('status').value,

	//LOCADOR
	'Cpf':            		document.getElementById('cpf').value,
	'Nome':           		document.getElementById('nome').value,

	//LOCACAO
	'IdLocador':            document.getElementById('idLocador').value,
	'IdTerno':           	document.getElementById('idTerno').value,

}

// FUNÇÕES LOCAÇÕES ---

function cadastrarLocacao(){
	if(!validaidLocador(idLocador)){
		return
	}

	if(!validaidTerno(idTerno)){
		return
	}

}
	//json


	fetch(url + "locacoes",
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


function validaidLocador(id){
	let divIdLocador = document.getElementById(idLocador)
	if(divIdLocador.value.trim().split(' ').length >= 2)
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
	let divIdTerno = document.getElementById(idTerno)
	if(divIdTerno.value.trim().split(' ').length >= 2)
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

function listarLocacao(){
    fetch(url + 'locacoes')
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
			btnRemover.onclick = u => remover(locacao.id)
			btnRemover.style.marginRight = '5px'

            //botão atualizar
            let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(locacao.id, divIdLocador, divIdTerno)
			btnAtualizar.style.marginLeft = '5px'

            //div com botoes
            let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)

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
	
	fetch(url + "locacoes/" + id,
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
		listarLocacao()
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
	fetch(url + 'locacoes/' + id,
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
		listarLocacao()
		console.log(output)
		alert('Locação Removida!')
	})
	.catch((error) =>
	{	
		listarLocacao()
		console.log(error)
		alert('Não foi possível remover a Locação!')
	})
}


function option()
{
	
	fetch(url + 'locacoes')
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


// FUNÇÕES TERNOS --- 

function cadastrarterno(){ //validação dos inputs
    if(!validaModelo(modelo)){
        return
    }

    if(!validaCor(cor)){
        return
    }

    if(!validaTamanho(tamanho)){
        return
    }

}
    //json

    

    fetch(url + "ternos",
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

function validaModelo(id){
    let divModelo = document.getElementById(modelo)
	if(divModelo.value.trim().split(' ').length >= 2)
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
    let divCor = document.getElementById(cor)
    if(divCor.value.trim().split(' ').length >= 2)
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
    let divTamanho = document.getElementById(tamanho)
    if(divTamanho.value.trim().split(' ').length >= 2)
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
			btnRemover.onclick = u => remover(terno.id)
			btnRemover.style.marginRight = '5px'

            //botão atualizar
            let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(terno.id, divModelo, divCor, divTamanho)
			btnAtualizar.style.marginLeft = '5px'

            //div com botoes
            let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)

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
	
	fetch(url + "ternos/" + id,
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
	fetch(url + 'ternos/' + id,
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
    if(!validaCpf(cpf)){
        return
    }

    if(!validaNomeLocador(nome)){
        return
    }
}
    //json


    fetch(url + "locadores",
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

function validaCpf(id){
    let divCpf = document.getElementById(cpf)
	if(divCpf.value.trim().split(' ').length >= 2)
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
    let divNome = document.getElementById(nome)
    if(divNome.value.trim().split(' ').length >= 2)
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
    fetch(url + 'locadores')
    .then(response => response.json())
	.then((Locadores) => {
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
			btnRemover.onclick = u => remover(locador.id)
			btnRemover.style.marginRight = '5px'

            //botão atualizar
            let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(locador.id, divCpf, divNome)
			btnAtualizar.style.marginLeft = '5px'

            //div com botoes
            let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divUsuario.appendChild(divBotoes)

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
	
	fetch(url + "locadores/" + id,
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
	fetch(url + 'locadores/' + id,
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
		alert('Não foi possível remover o Locador')
	})
}


function option()
{
	
	fetch(url + 'locadores')
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
