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
  var query1="SELECT * FROM Company_";
  Promise.all([
  queryWrapper(query1)
  ]).then(
    function(values1){
      values1 = values1[0]
      let list = new Array(values1.length)
      for(let i=0; i<values1.length; i++){
        list[i] = values1[i].compName;   
      }

    res.render("homepage", {title:"hello",values: list});  
    }
  ).catch( (err)=> {
    console.log('error: ', err);
});;
  });

/*
router.get('/:companyname', (req, res)=>{
  console.log("Hello");
})
*/
module.exports = router;