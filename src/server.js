

const express = require("express")
const server = express()

// capturando o banco de dados
const db = require("./database/db.js")

// configurar pasta public
// uso da use quer dizer que está sendo feito uma conf do servidor
server.use(express.static("public"))

// habilitar o uso do req.body na aplicação
server.use(express.urlencoded({extended: true}))

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

    // req.query - Query Strings da nossa url
    //console.log(req.query)
    return res.render("create-point.html")
})

// o verbo post guarda as informações do formulário de forma mais discreta, não mostrando essas informações na url 

server.post("/savepoint", (req,res) =>{

    // req.body: O corpo do formulário 
    //console.log(req.body)
    // inserir as informações no banco de dados


    // 2. inserir dados na tabela
    const query = `
        INSERT INTO places (
        image,
        name,
        address, 
        adress2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?); `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.adress,
        req.body.state,
        req.body.city,
        req.body.items
        
    ] 

    function afterInsertData(err){

         // logo após rodar todo o código ela será executada.
         // callback - função que é chamada de volta, outras áreas do código funcionam normalmente não é necessario esperar algo acontecer
         // para que outras funções acontecam,mas assim que algo que 
         // se estava esperando acontecer acontce a callback traz isso de volta e executa.
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")

        }
        console.log("Cadastrado com sucesso! ")
        console.log(this)
        return res.render("create-point.html", { saved: true})
        }

        db.run(query, values, afterInsertData)




    
})

server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html",{total:0})
    }

     // 3. consultar os dados da tabela
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
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

