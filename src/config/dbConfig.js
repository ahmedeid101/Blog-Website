const mongose = require("mongoose");

module.exports = async () =>{
    try {
        await mongose.connect(process.env.MONGO_URL);
        console.log('Connected Successfully To MongoDb ^_^');
        
    } catch (error) {
        console.log('Conniction Faild To MongoDb', error)
    }
}