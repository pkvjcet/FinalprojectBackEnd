const express=require('express');
const UserData = require('./src/model/Userdata');
const Examdata=require('./src/model/Examdata')
var app=new express();
var studentrouter=require('./routes/student');
var facultyrouter=require('./routes/faculty');
var bodyParser=require('body-parser');
const cors=require('cors');



app.use('/student',studentrouter);
app.use('/faculty',facultyrouter);
app.use(cors());
app.use(bodyParser.json());

app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    var user = {       
        userFullName : req.body.user.userFullName,
        userName : req.body.user.userName,
        userPassword : req.body.user.userPassword,
        userType : req.body.user.userType       
   }       
   var user = new UserData(user);
   user.save();
   res.send("Successfully Inserted");
});
app.post('/verify',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var userName=req.body.userName;
    var userPassword=req.body.userPassword;
    console.log(userName+userPassword)
    UserData.find({userName:userName,userPassword:userPassword}).then((user)=>{
        console.log(user);
        res.send(user);
    });
    

   //res.send("Successfully Inserted");
});

app.post('/createexam',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log(req.body);
    var exam = {       
        name : req.body.name,
        faculty : req.body.faculty,
        time : req.body.time,
        participants : [] ,
        qns:[]    
   }       
   var newexam = new Examdata(exam);
   newexam.save();
   res.send("Successfully Inserted");
});

app.post('/getexamnames',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var faculty=req.body.faculty;    
    console.log("searching exam names"+faculty)
    Examdata.find({faculty:faculty}).select('name  -_id').then((examnames)=>{
        console.log(examnames);
        res.send(examnames);
    })
});

app.get('/getstudents',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    
   
    UserData.find({userType : "student"}).then((students)=>{
        console.log(students);
        res.send(students);
    })
});


app.post('/enrollstudents',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
   
    var examname = req.body.examname;
    var faculty = req.body.faculty;
    var studentid = req.body.studentid;
    var studentfullname = req.body.studentfullname;
    console.log("In enrolling....checking...")
    console.log("{name:"+examname+",faculty:"+faculty+"},{$push: {participants: {studentname: "+studentfullname+",username: "+studentid+",attended:false,mark:0}")
    
    Examdata.updateOne({name:examname,faculty:faculty},{
        $push: {"participants": {studentname: studentfullname,username: studentid,attended:false,mark:0}} 
    },
    function(err, doc){
        if (err) console.log(err);
    }
    );
    console.log("updated i think")

   

//    var newexam = new Examdata(exam);
//    newexam.save();
   res.send("Successfully Enrolled");
});


app.post('/uploadqns',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  
    var examname = req.body.examname;
    var faculty = req.body.faculty;
    var qnname = req.body.qnname;
    var opt1 = req.body.opt1;
    var opt2 = req.body.opt2;
    var opt3 = req.body.opt3;
    var opt4 = req.body.opt4;
    var ans = req.body.ans;
    
    console.log("In Adding qns.. ")
    //console.log("{name:"+examname+",faculty:"+faculty+"},{$push: {participants: {studentname: "+studentfullname+",username: "+studentid+",attended:false,mark:0}")
    
    Examdata.updateOne({name:examname,faculty:faculty},{
        $push: {"qns": {qusestion: qnname,opt1: opt1,opt2:opt2,opt3:opt3,opt4: opt4,ans:ans}} 
    },
    function(err, doc){
        if (err) console.log(err);
    }
    );
    console.log("qns added  i think")

   res.send("Successfully Added Questions");
});


app.post('/viewresult',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var faculty=req.body.faculty;    
    var examname=req.body.examname;
    console.log("View Reult"+faculty+ examname)
    Examdata.find({faculty:faculty,name:examname}).select('participants -_id').then((participants)=>{
        console.log(participants);
        res.send(participants);
    })
});



app.post('/getEnrolledExams',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    var student=req.body.student;    
    //{ stock : { $elemMatch : { country : "01", "warehouse.code" : "02" } }   
    
    Examdata.find({participants :{$elemMatch :{studentname:student,attended:false}}}).select('name -_id').then((exams)=>{
        console.log("verify getEnrolled Exams"+exams);
        res.send(exams);
    })
    
    // Examdata.find({'participants.studentname':student,'participants.attended':false}).select('name -_id').then((exams)=>{
    //     console.log("verify getEnrolled Exams"+exams);
    //     res.send(exams);
    // })
});


app.post('/getqns',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
     
    var examname=req.body.exam;
    
    Examdata.find({name:examname}).select('qns -_id').then((qns)=>{
        console.log(qns);
        res.send(qns);
    })
});

app.post('/updatemark',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
  
    var examname = req.body.exam; 
    var student = req.body.student;   
    var mark = req.body.mark;
    
    //console.log("In Adding qns.. ")
    //console.log("{name:"+examname+",faculty:"+faculty+"},{$push: {participants: {studentname: "+studentfullname+",username: "+studentid+",attended:false,mark:0}")
    
    Examdata.updateOne({name:examname,'participants.studentname':student},{
        $set: {'participants.$.attended':true,'participants.$.mark': mark} 
    },
    function(err, doc){
        if (err) console.log(err);
    }
    );
    console.log("Marks updated")

   res.send("Successfully Updated");
});


app.post('/testing',function(req,res){
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    console.log('testing call');
    
});

app.listen(process.env.PORT ||3000, function(){
    console.log('listening to port 3000');
});
