const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const port = process.env.PORT || 8080;
var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
      if(err) {
        console.log('There was an error on server.log file', err);
      }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


app.get('/', (req, res) => {
    // res.send('Hello world once again');
    res.render('home.hbs', {
        pageTitle: 'THIS IS THE HOME BRUH',
        textInfo: 'This is all kinds of nonsense bullshit'
    });
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
      pageTitle: 'About Page'
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
      pageTitle: 'Project'
    });
});


// bad - unable to handle request
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
