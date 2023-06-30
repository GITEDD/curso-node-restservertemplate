const mongosse = require('mongoose');

const dbConnection = async ()=> {

    try{
        await mongosse.connect(process.env.MONGO_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });

        console.log("connection DB succes")

    } catch(error) {
        console.log(error)
        throw  new('Error of connection in the bd')
    }

}

module.exports={
    dbConnection
}