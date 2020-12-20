var express = require('express');
var connection=require('../connection');
const bodyParser = require('body-parser'); // to parse the request param

var app=express();
var router = express.Router();


const queryWrapper= (statement) => {
    return new Promise((resolve,reject) => {
      connection.query(statement,(err,rows,fields) => {
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
    ]).then(function(values1){
      console.log(values1)
      res.render('companyDetails',{listComp:values1[0]})  
      }
    ).catch( (err)=> {
      console.log('error: ', err);
  });;
    });

module.exports=router;