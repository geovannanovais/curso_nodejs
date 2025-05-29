import express from 'express'; //importar express

const servidor = express();
servidor.use(express.json()); // permite usar parametros de corpo na aplicação

servidor.get("/helloworld", (req, resp) =>{
    //código de endpoint
    resp.send({
            mensagem: "Hello Worlddd :)" //retorna um objeto JSON
    });

});



//Path versionado
servidor.get("/mensagem/boasvindas", (req, resp) =>{
    resp.send({
        mensagem: "Olá, sejam bem-vindos e bem-vindas!"
    });
});

servidor.get("/v2/mensagem/boasvindas", (req, resp) => {
    resp.send({
        mensagem: "Que bom que você está aqui!"
    });
});

//path segmentado
servidor.get("/mensagem/ocupado", (req, resp) => {
    resp.send({
        mensagem: "Estou ocupada no momento"
    });
});

servidor.get("/mensagem/ocupado/recado", (req, resp) => {
    resp.send({
        mensagem: "Estou ocupada, deixe um recado no email xxxxxxx"
    });
});



//parametro de rota: Soma
servidor.get("/calculadora/soma/:n1/:n2", (req, resp) => {
    let n1 = Number(req.params.n1); //parametro de rota vem sempre como string
    let n2 = Number(req.params.n2); //O "Number" converte o texto para número
    let soma = n1 + n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        soma: soma
    });
});

//parametro de rota: Subtracao
servidor.get("/calculadora/subtracao/:n1/:n2", (req, resp) => {
    let n1 = Number(req.params.n1); //parametro de rota vem sempre como string
    let n2 = Number(req.params.n2); //O "Number" converte o texto para número
    let subtracao = n1 - n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        subtracao: subtracao
    });
});

//parametro de rota: Divisao
servidor.get("/calculadora/divisao/:n1/:n2", (req, resp) => {
    let n1 = Number(req.params.n1); //parametro de rota vem sempre como string
    let n2 = Number(req.params.n2); //O "Number" converte o texto para número
    let divisao = n1 / n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        divisao: divisao
    });
});



//parametro de query: Soma
servidor.get("/calculadora/soma2", (req, resp) => {
    let n1 = Number(req.query.n1); //não precisa especificar o parametro quando for query
    let n2 = Number(req.query.n2); //O "Number" converte o texto para número
    let soma = n1 + n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        soma: soma
    });
});

//parametro de query: Subtracao
servidor.get("/calculadora/subtracao2", (req, resp) => {
    let n1 = Number(req.query.n1); //não precisa especificar o parametro quando for query
    let n2 = Number(req.query.n2); //O "Number" converte o texto para número
    let subtracao = n1 - n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        subtracao: subtracao
    });
});

//parametro de query: Divisao
servidor.get("/calculadora/divisao2", (req, resp) => {
    let n1 = Number(req.query.n1); //não precisa especificar o parametro quando for query
    let n2 = Number(req.query.n2); //O "Number" converte o texto para número
    let divisao = n1 / n2;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2
        },
        divisao: divisao
    });
});

//parametro de query: texto
servidor.get("/mensagem/ola", (req, resp) => {
    let pessoa = req.query.nome ?? "você"; //caso nao especifique o parametro, aparece a mensagem "você"
    resp.send({
        mensagem: "Olá " + pessoa
    });
});



//parametro de corpo (objeto)
servidor.post("/media", (req, resp) => {
    let n1 = req.body.nota1;
    let n2 = req.body.nota2;
    let n3 = req.body.nota3;

    let media = (n1 + n2 + n3) / 3;

    resp.send({
        entradas: {
            numero1: n1,
            numero2: n2,
            numero3: n3
        },
        media: media
    });
});

//parametro de corpo (vetor)
servidor.post("/dobros", (req, resp) => {
    let num = req.body.numeros;
    let num2 = [];

    for(let i = 0; i < num.length; i++){
        num2[i] = num[i] * 2
    }
    
    resp.send({
        numeros: num,
        dobros: num2});
});



//parametro combinado (query e corpo)
servidor.post("/loja/pedido", (req, resp) => {
    let total = req.body.total;
    let parcelas = req.body.parcelas;
    let cupom = req.query.cupom;

    if (parcelas > 1) {
        let juros = total * 0.05;
        total += juros;
    }

    if (cupom == "QUERO100") {
        total -= 100;
    }

    let valorParcela = total / parcelas;

    resp.send({
        total: total,
        qtdParcelas: parcelas,
        valorParcela: valorParcela
    });
});



//parametro combinado (objeto)
servidor.post("/loja/pedido/completo", (req, resp) => {
    let parcelas = req.body.parcelas;
    let itens = req.body.itens;
    let cupom = req.query.cupom;

    let total = 0;
    for (let produto of itens) {
        total += produto.preco;
    }

    if (parcelas > 1) {
        let juros = total * 0.05;
        total += juros;
    }

    if (cupom == "QUERO100") {
        total -= 100;
    }

    let valorParcela = total / parcelas;

    resp.send({
        total: total,
        qtdParcelas: parcelas,
        valorParcela: valorParcela
    });
});

servidor.listen(
    5001, 
    () => console.log('---> API subiu com sucesso! Porta 5001.')); //vincular api a uma porta