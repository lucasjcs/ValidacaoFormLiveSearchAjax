//===================ESTILIZAÇÃO DO FORMULARIO======================
$(document).ready(function () {
   $(".conteudo-form input").blur(function () {
       if(this.value == "" || this.value == null){
           $(this).css("border","solid red 1px");
       }else{
           $(this).css("border","");
       }
   });
});
//=================FIM DA ESTILIZAÇÃO DO FORMULÁRIO=======================

//================= Live Search ====================================

$(document).ready(function () {
    var meuTexto;
    var dados;

    $.get("js/banco.txt", function(texto){
        meuTexto = texto;
        dados = meuTexto.split(", "); //seleciona o tipo de separação, por virgula, espaço, etc..
        var elemento;
        //até que chegue no final do documento
        for(i = 0; i<dados.length;i++){
            elemento = dados[i]; //elemento recebe a primeira palavra antes de encontrar o separador (split)
            $("datalist").append("<option>"+elemento+"</option>"); //coloco o elemento no datalist
        }

    });
});

//================ end live search =================================




//================ HEADER - PESQUISA =============================
$(document).ready(function () {
    $("#pesquisar").click(function () {
        $("#txtpesq").toggle(200);
    });
});

//=================================================================


//=================Mascara para Data ======================================
function mascaraData(campo, e){
    var kC = (document.all) ? event.keyCode : e.keyCode;
    var data = campo.value;

    if( kC!=8 && kC!=46 ){
        if( data.length==2 ){
            campo.value = data += '/';
        }
        else if( data.length==5 ){
            campo.value = data += '/';
        }
        else
            campo.value = data;
    }
}
//=========================================================================



//=========================VALIDAÇÃO DE CEP=======================================

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('estado').value=("");
    document.getElementById('bairro').value=("");
    document.getElementById('cidade').value=("");
    document.getElementById('endereco').value="...";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('estado').value=(conteudo.uf);
        document.getElementById('endereco').value=(conteudo.logradouro);

    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('cidade').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('estado').value="...";
            document.getElementById('endereco').value="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = '//viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}
//=================FIM DA VALIDAÇÃO DE CEP======================================


//=======================Verificação de preenchimento ========================

$(document).ready(function () {
    $("#formulario").submit(function () {
        var nome, data, email,cep, cidade, estado,bairro, endereco, numero;

        nome = $("#nome").val();
        data = $("#datanasc").val();
        email = $("#email").val();
        cep = $("#cep").val();
        cidade = $("#cidade").val();
        estado = $("#estado").val();
        bairro = $("#bairro").val();
        endereco = $("#endereco").val();
        numero = $("#numero").val();

        if(nome =="" || data =="" || email =="" || cep =="" || cidade =="" || estado =="" || bairro =="" || endereco =="" || numero ==""){

            $("#notifica").text("Preencha todos os campos!");
            $("#notifica").css("display","block");
            $('html, body').animate({scrollTop:0}, 'slow');

            return false;
        }
    });
});

//============================================================================
