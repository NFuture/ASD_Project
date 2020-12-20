var express = require('express');
var mysql = require('mysql');
const path = require("path");
const createError = require('http-errors');
const router = express.Router();

// connecting all the source code of different pages 
var connection  = require('./connection');
var homepageRouter = require('./routes/homepage.js');
var compMangRouter = require('./routes/compMang');
var companyDetailsRouter = require('./routes/companyDetails');


const app = express();
// setting up the template engine and loading the bootstrap
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))

// routes for each pages
app.use('/', homepageRouter);
app.use('/compMang', compMangRouter);
app.use('/companyDetails', companyDetailsRouter);


// catch 404 error
app.use((req, res, next) => {
  next(createError(404));  
});
// error handling 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.port || 3000);

module.exports = app;