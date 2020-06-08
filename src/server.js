

const express = require("express")
const server = express()

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
    return res.render("search-results.html")
})





// ligar o servidor

server.listen(3000)

