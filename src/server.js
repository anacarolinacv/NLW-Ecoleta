

const express = require("express")
const server = express()

// capturando o banco de dados
const db = require("./database/db.js")

// configurar pasta public
// uso da use quer dizer que está sendo feito uma conf do servidor
server.use(express.static("public"))

//utilizando template engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    /* para não guardar coisas no cache*/ 
    noCache: true
})





// configurar caminhos da minha solução
// página inicial
// get é um verbo do http
// req: requisicao
// res: resposta

// dirname: nome do diretório 
/*server.get("/", (req, res) => {
    res.render(__dirname + "/views/index.html")

})

server.get("/create-point", (req, res) => {
    res.render   (__dirname + "/views/create-point.html")

})*/

server.get("/", (req, res) => {
    return res.render("index.html", {title: "Um title"})

})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {

     // 3. consultar os dados da tabela
     db.all(` SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        const total = rows.length
        // mostrar a página html com as informações do banco de dados
        return res.render("search-results.html", {places: rows, total: total})

    }) 

})





// ligar o servidor

server.listen(3000)

