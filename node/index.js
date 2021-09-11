const express = require("express")
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'challengedb'
}
const mysql = require('mysql')



const app = express()
const port = 3000

app.get('/', (req, res) => {
    const conn = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('Vitor');`
    conn.query(sql)
    conn.query(`SELECT name FROM people`, function (error, result, fields) {
        let row = []
        Object.keys(result).forEach(function (key) {
            console.log(result[key].name)
            row.push(result[key].name);
        });

        const list = row.map((listItem) => `<li>${listItem}</li>`)
        console.log(list)
        res.send(`
            <h1>Full Cycle</h1>
            <ul>
                ${list.join('\n')}
            </ul>
        `)
    });
    conn.end()
})

app.listen(port, () => console.log(`Rodando na porta ${port}`))



