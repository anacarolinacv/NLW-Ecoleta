// configuração do banco de dados
// importar a dependencia do sqlite3
// o .verbose serve para configurar o sqlite, sempre mandando mensagens para o terminal avisando algo que possa estar acontecendo.
const sqlite3 = require("sqlite3").verbose()


// criar o objeto que irá fazer operações no banco de dados
// o caminho passado como parâmetro indica qual o local aonde o banco de dados deve ser criado.

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

// utilizar o objeto de banco de dados, para nossas operações
// o serialize é responsável por executar uma sequência de código

   db.serialize(() => {
    // com comandos SQL eu vou :
    // 1. criar uma tabela
    //  com crases é possível criar quebras de linha 

      db.run(`
    CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        image TEXT, 
        name TEXT,
        address TEXT,
        adress2 TEXT,
        state TEXT,
        city TEXT,
        items TEXT
    );
    `)

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
        "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul", 
        "Resíduos Eletrônicos, Lâmpadas"
    ] 

    function afterInsertData(err){

         // logo após rodar todo o código ela será executada.
         // callback - função que é chamada de volta, outras áreas do código funcionam normalmente não é necessario esperar algo acontecer
         // para que outras funções acontecam,mas assim que algo que 
         // se estava esperando acontecer acontce a callback traz isso de volta e executa.
        if(err){
            return console.log(err)

        }
        console.log("Cadastrado com sucesso! ")
        console.log(this)
        }

        db.run(query, values, afterInsertData)

/*      // 3. consultar os dados da tabela
    db.all(` SELECT * FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log("Aqui estão os seus registros: ")
        console.log(rows)

    }) 
     //4. Deletar um dado da tabela 
    db.run(`DELETE FROM places`, function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registro deletado com sucesso")

    })*/ 
 

})