const express = require('express');

const mongoose require('mongoose');

const bodyParser require('body-parser');

const session = require('express-session');

const MongoStore = require('connect-mongo');
const app = express();

const PORT process.env.PORT || 3000;
// Connect to MongoDB

mongoose.connect('mongodb://localhost/intern_dashboard', {

    useNewUrlParser: true,

    useUnifiedTopology: true,

});

// Middleware

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({

    secret: 'secret',

    resave: false,

    saveUninitialized: false,

    store: MongoStore.create({ mongourl: 'mongodb://localhost/intern_dashboard' })

}));

// Set EJS as templating engine

app.set('view engine', 'ejs');

// Intern model

const internSchema new mongoose.Schema({

    name: String,

    email: String,

    position: String,

));

const Intern mongoose.model('Intern', internSchema);
// Routes

app.get('/', (req, res) => {

    Intern.find({}, (err, interns) => {

        if (err) return console.error(err);

        res.render('index', (interns });

});

 });

app.post('/add-intern', (req, res) => {

    const newIntern new Intern({

        name: req.body.name,

        email: req.body.email,

        position: req.body.position,

    });

    newIntern.save(err => {

        if (err) return console.error(err);

        res.redirect('/');

    });
});
app.listen(PORT, () => { }
console.log('server is running on https://localhost:${PORT}');
});