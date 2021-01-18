<script>
    document.getElementById("btn-anexo").addEventListener("click", function (event) {
        event.preventDefault()

        if (!document.getElementById('arquivos').value) {
            document.getElementById('erro-arquivo').innerText = "Selecione pelo menos um arquivo";
            return;
        } else {
            document.getElementById('erro-arquivo').innerText = "";
        }

        if (!document.getElementById('descricao').value) {
            document.getElementById('erro-descricao').innerText = "O campo Descrição está inválido";
            return;
        } else {
            document.getElementById('erro-descricao').innerText = "";
        }
        if (document.getElementById('descricao').value.length > 100) {
            document.getElementById('erro-descricao').innerText = "O campo Descrição deve possuir até 100 caracteres";
            return;
        } else {
            document.getElementById('erro-descricao').innerText = "";
        }


        $('#defaultModal').modal('hide');
        uploadFiles('arquivos', '@Url.Action("Anexar", "OrdemServico")', null, { ordemServicoId: @ordemServicoId, descricao: $('#descricao').val(), tipoAnexoId: $('#TipoAnexoId').val()});
    });
</script>