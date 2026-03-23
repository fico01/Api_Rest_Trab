const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());

let produtos = [
    { id: 1, nome: "Mouse Gamer", preco: 150, categoria: "Perifericos", estoque: 5 },
    { id: 2, nome: "Teclado Mecânico", preco: 200, categoria: "Perifericos", estoque: 20 },
    { id: 3, nome: "Headset 7.1", preco: 50, categoria: "Perifericos", estoque: 25 },
    { id: 4, nome: "RTX 3080", preco: 2000, categoria: "Hardware", estoque: 60 },
    { id: 5, nome: "Processador i5-13g", preco: 1500, categoria: "Hardware", estoque: 35 },
    { id: 6, nome: "Monitor 144hz", preco: 1200, categoria: "Monitores", estoque: 10 },
    { id: 7, nome: "Memória RAM 16GB", preco: 400, categoria: "Hardware", estoque: 50 },
    { id: 8, nome: "SSD NVMe 1TB", preco: 350, categoria: "Hardware", estoque: 40 },
    { id: 9, nome: "Fonte 750W Gold", preco: 600, categoria: "Hardware", estoque: 15 },
    { id: 10, nome: "Gabinete Mid Tower", preco: 300, categoria: "Hardware", estoque: 8 }
];

app.get('/api/produtos', (req, res) => {
    const { nome, categoria } = req.query;
    let resultado = [...produtos];

    if (nome) resultado = resultado.filter(p => p.nome.toLowerCase().includes(nome.toLowerCase()));
    if (categoria) resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());

    res.status(200).json(resultado);
});

app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado." });
    res.status(200).json(produto);
});

app.post('/api/produtos', (req, res) => {
    const { nome, preco, categoria, estoque } = req.body;

    if (!nome || !preco || !categoria) {
        return res.status(400).json({ erro: "Nome, preço e categoria são obrigatórios." });
    }

    const novoProduto = {
        id: produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1,
        nome,
        preco,
        categoria,
        estoque: estoque || 0
    };

    produtos.push(novoProduto);
    res.status(201).json(novoProduto);
});

app.put('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: "Produto não encontrado para atualizar." });

    const { nome, preco, categoria, estoque } = req.body;

    produtos[index] = {
        ...produtos[index],
        nome: nome || produtos[index].nome,
        preco: preco || produtos[index].preco,
        categoria: categoria || produtos[index].categoria,
        estoque: estoque !== undefined ? estoque : produtos[index].estoque
    };

    res.status(200).json(produtos[index]);
});


app.delete('/api/produtos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) return res.status(404).json({ erro: "Produto não encontrado para deletar." });

    produtos.splice(index, 1);
    res.status(204).send();
});


app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});