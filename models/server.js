const { SERVFAIL } = require("dns");
const express = require('express');
const  cors = require('cors');
const {dbConnection} = require('../database/config')

require('dotenv').config();


class Server {

    constructor(){
        this.app = express();       
        this.port = process.env.PORT;
        this.usersPath ='/api/users';

        //connection db
        this.connectDB();

        //Middleware
        this.middlewares()

        //routes
        this.routes();


    }
    
    async connectDB(){
        await dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Parse and read of body

        this.app.use(express.json())

        //Directorio public
        this.app.use(express.static('public'));
    }

    routes()
    {
        this.app.use(this.usersPath, require('../routes/users'))
        
    }

    listen() {
        this.app. listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        });
    }

}

module.exports = Server;