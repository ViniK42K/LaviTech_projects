document.addEventListener("DOMContentLoaded", function () {
    let inputBusca = document.getElementById("campo-busca");
    let botaoBusca = document.getElementById("botao-busca");
    let listaContatos = document.getElementById("lista-contatos");
    let formulario = document.getElementById("formulario-contato");

    let contatos = []; // Lista para armazenar os contatos

    // Atualiza a exibição da lista
    function atualizarLista() {
        listaContatos.innerHTML = "";

        for (let i = 0; i < contatos.length; i++) {
            let contato = contatos[i];

            let item = document.createElement("li");
            item.innerHTML = contato.nome + " - " + contato.telefone + " - " + contato.email +
                ' <button onclick="editarContato(' + i + ')">Editar</button>' +
                ' <button onclick="removerContato(' + i + ')">Remover</button>';

            listaContatos.appendChild(item);
        }
    }

    // Adiciona um novo contato
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        let nome = document.getElementById("campo-nome").value;
        let telefone = document.getElementById("campo-telefone").value;
        let email = document.getElementById("campo-email").value;

        if (nome === "" || telefone === "") {
            alert("Nome e telefone são obrigatórios!");
            return;
        }

        contatos.push({ nome: nome, telefone: telefone, email: email });

        atualizarLista();
        formulario.reset();
    });

    // Editar contato
    window.editarContato = function (index) {
        let contato = contatos[index];

        document.getElementById("campo-nome").value = contato.nome;
        document.getElementById("campo-telefone").value = contato.telefone;
        document.getElementById("campo-email").value = contato.email;

        contatos.splice(index, 1);
        atualizarLista();
    };

    // Remover contato
    window.removerContato = function (index) {
        contatos.splice(index, 1);
        atualizarLista();
    };

    // Buscar contato pelo nome, telefone ou e-mail
    function buscarContato() {
        let termo = inputBusca.value.toLowerCase();

        let contatosLista = listaContatos.getElementsByTagName("li");

        for (let i = 0; i < contatosLista.length; i++) {
            let contatoTexto = contatosLista[i].textContent.toLowerCase();

            if (contatoTexto.includes(termo)) {
                contatosLista[i].style.display = "";
            } else {
                contatosLista[i].style.display = "none";
            }
        }
    }

    botaoBusca.addEventListener("click", buscarContato);
    inputBusca.addEventListener("input", buscarContato);
});
