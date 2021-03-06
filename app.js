//jshint esversion: 6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + '/date.js');
const app = express();

var newTasks = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.listen(3000, function(){
  console.log('server started on port 3000');
});

// Home route
app.get('/', function(req, res){
  let day = date.getDay();

  res.render('list', {
    listTitle: day,
    newListItem: newTasks,
  });
});

app.post('/', function(req, res){
  let newTask = req.body.newItem;

  if(req.body.list === 'Work'){
    workItems.push(newTask);
    res.redirect('/work');
  } else {
    newTasks.push(newTask);
    res.redirect('/')
  }
});

// work route
app.get('/work', function(req, res){
  res.render('list', {
    listTitle: 'Work List',
    newListItem: workItems
  });
});

app.post('/work', function(req, res){
  let item = req.body.newItem;
  workItems.push(item);

  res.redirect('/');
});

//about route
app.get('/about', function(req, res){
  res.render('about');
});
