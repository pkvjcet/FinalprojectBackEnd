const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/onlineexamdb', { useNewUrlParser: true ,useUnifiedTopology: true });
mongoose.connect('mongodb+srv://pk:pk@cluster0-yxuce.mongodb.net/onlineexamdb?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
//mongodb+srv://pk:<password>@cluster0-yxuce.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://pk:<password>@cluster0-yxuce.mongodb.net/test?retryWrites=true&w=majority

const Schema = mongoose.Schema;

var NewUserSchema = new Schema({
    userFullName : String,
    userName : String,
    userPassword : String,
    userType : String    
});

var Userdata = mongoose.model('user', NewUserSchema);                        //UserData is the model and NewBookData is the schema

module.exports = Userdata;