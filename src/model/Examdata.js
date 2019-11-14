const mongoose = require('mongoose'); 
//mongoose.connect('mongodb://localhost:27017/onlineexamdb', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://pk:pk@cluster0-yxuce.mongodb.net/onlineexamdb?retryWrites=true&w=majority',{ useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect('mongodb+srv://pk:pk@cluster0-yxuce.mongodb.net/ProductDb?retryWrites=true&w=majority');
//mongodb+srv://pk:<password>@cluster0-yxuce.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://pk:<password>@cluster0-yxuce.mongodb.net/test?retryWrites=true&w=majority

const Schema = mongoose.Schema;

var NewExamSchema = new Schema({
    name : String,
    faculty : String,
    time : Number,
    participants :  [{studentname:String,username:String,attended:Boolean,mark:Number}]  ,
    qns:[{qusestion:String,opt1:String,opt2:String,opt3:String,opt4:String,ans:String}] 
});

var Examdata = mongoose.model('examdetail', NewExamSchema);                        //UserData is the model and NewBookData is the schema

module.exports = Examdata;