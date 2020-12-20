const mysql=require('mysql');
var mysqlConnection=mysql.createConnection(
   {
    hostname:"localhost",
    user    :"root",
    password:"nitr0gen#",
    database:"company_info",
    multipleStatements:true
   } 
);

mysqlConnection.connect(function(err){
    if(!err)
    {
        console.log("connected");
    }
    else{
        console.log("connection failed: "+err);
    }
});
module.exports=mysqlConnection;