const express = require('express');

const app = express();

const port = 3000;

app.get('/api/hello', (req, res) => {
    res.send('Olá, Mundo');
});

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./meu_banco.db', (err) =>{
    if (err) {
        console.error('Erro ao abrir o banco de dados', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
    }

    db.run(`
        CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        senha TEXT NOT NULL,
        telefone INTEGER ,
        CEP INTEGER,
        End TEXT NOT NULL,
        Número INTEGER,
        Complemento TEXT NOT NULL,
        Bairro TEXT NOT NULL,
        Cidade TEXT NOT NULL,
        Estado TEXT NOT NULL
        )
        `, (err) =>{
            if (err) {
                console.error('Erro ao criar a tabela', err.message);
            } else {
                console.log('Tabela clientes criada com sucesso.');
            }
        })

        db.run(`
            CREATE TABLE IF NOT EXISTS produtos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nomeLanche TEXT NOT NULL,
            descrição TEXT NOT NULL,
            preco INTEGER
            )
            `, (err) =>{
                if (err) {
                    console.error('Erro ao criar a tabela', err.message);
                } else {
                    console.log('Tabela produtos criada com sucesso.');
                }
            })

            db.run(`
                CREATE TABLE IF NOT EXISTS pedido (
                idPedido INTEGER PRIMARY KEY AUTOINCREMENT,
                idCliente INT REFERENCES clientes(id),
                idProduto INT REFERENCES produtos(id),
                horarioPedido DATETIME DEFAULT CURRENT_TIMESTAMP,
                horarioEntrega DATETIME DEFAULT CURRENT_TIMESTAMP,
                formaPagamento TEXT DEFAULT 'PIX' CHECK (formaPagamento IN ('Cartão', 'PIX')),
                estado TEXT DEFAULT 'ACEITO' CHECK (estado IN ('Aceito', 'Em andamento', 'Concluído'))
                )
                `, (err) =>{
                    if (err) {
                        console.error('Erro ao criar a tabela', err.message);
                    } else {
                        console.log('Tabela pedido criada com sucesso.');
                    }
                })

})

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`);
}); 
