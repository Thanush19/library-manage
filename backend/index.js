import express from 'express';
import dotenv from "dotenv"
import cors from "cors"
import pg from 'pg'
import handler from 'express-async-handler'

const Pool = pg.Pool;


dotenv.config();


// const pool = new Pool({
//     host: process.env.HOST,
//     port: process.env.PORT,
//     user: process.env.USER,
//     database: process.env.DB,
//     password:process.env.PASSWORD
// })

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})



const PORT = 8000


const app = express();




const createConnection = async () => {
    try {
        await pool.connect();
        console.log("DB COnnected")
    } catch (error) {
        console.log(error.message)
        
    }
}

createConnection()

app.use(cors({
    // origin: [
    //     'http://localhost:5173',
    //     'https://taskhosting.vercel.app/'
    // ]
}))

app.use(express.json())

app.post('/postBooks', handler(async (req,res) => {
    const { name, author, description } = req.body    
    const result = await pool.query('INSERT INTO books(name,author,description) VALUES($1,$2,$3)', [name, author, description])
    

    return res.status(201).json(
        result.rows[0]
    )

}))

app.get('/getBooks', handler(async (req, res) => {
    const limit = req.query.limit || 5;

    const result = await pool.query(
        `SELECT * from books LIMIT ${limit}`
    )

    return res.status(200).json(
        result.rows
    )
}))  



app.use((req,res,err) => {
    const statusCode = req.statusCode;

    return res.status(statusCode).json({
        msg:err.message
        
    }
    )
})







app.listen(PORT, () => {
    console.log("Server Listining at port "+PORT)
})