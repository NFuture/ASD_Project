var express = require('express');
var connection=require('../connection');
const bodyParser = require('body-parser'); // to parse the request param

var app=express();
var router = express.Router();


const queryWrapper=function(statement){
  return new Promise(function(resolve,reject){
    connection.query(statement,function(err,rows,fields){
      if(!err)
      {
        resolve(rows);
      }
      else{
        reject(err);
      }
    });
  });
};

router.get('/', function(req, res, next) {
var query1="SELECT * FROM Director";
Promise.all([
queryWrapper(query1)
]).then(
  function(values1){
    values1 = values1[0]

    console.log(values1)
    res.render("compMang",{dirList:values1});  
  }
).catch( (err)=> {
  console.log('error: ', err);
});;
});


module.exports=router;

//DIN DirectorName ISIN