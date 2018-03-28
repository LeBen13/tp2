const express = require('express');
const fs = require("fs");
const app = express();

const server = require('http').createServer(app);
const io = require('./mes_modules/chat_socket').listen(server);


const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const cookieParser = require('cookie-parser');
const i18n = require('i18n');
i18n.configure({
    locales: ['fr', 'en'],
    cookie: 'langueChoisie',
    directory: __dirname + '/locales'
});


const util = require("util");

const peupler = require('./mes_modules/peupler');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(i18n.init);

app.set('view engine', 'ejs');

app.get('/', (req, res) => {

    console.log('accueil');
    res.render('accueil.ejs');
});

app.get('/membres', (req, res) => {

    db.collection('adresse').find().toArray(function (err, resultat) {

        if (err) return console.log(err);

        res.render('membres.ejs', {
            membres: resultat
        });
    });
});


app.post('/ajouter_ajax', (req, res) => {
    req.body._id = ObjectID(req.body._id)

    db.collection('adresse').save(req.body, (err, result) => {
        if (err) return console.log(err)
        res.send(JSON.stringify(req.body));
    })
})


app.post('/modifier_ajax', (req, res) => {
    req.body._id = ObjectID(req.body._id)

    db.collection('adresse').save(req.body, (err, result) => {
        if (err) return console.log(err)
        res.send(JSON.stringify(req.body));

    })
})


app.post('/supprimer_ajax', (req, res) => {
    req.body._id = ObjectID(req.body._id);
    db.collection('adresse').findOneAndDelete({
        "_id": req.body._id
    }, (err, resultat) => {

        if (err) return .log(err)
        res.send(JSON.stringify(req.body));
    })
})

app.get('/trier/:cle/:ordre', function (req, res) {

    let cle = req.params.cle;

    let ordre = (req.params.ordre == 'asc' ? 1 : -1);

    db.collection('adresse').find().sort(cle, ordre).toArray(function (err, resultat) {
        if (ordre == 1) {
            ordre = 'desc';
        } else {
            ordre = 'asc';
        }

        res.render('membres.ejs', {
            membres: resultat,
            ordre_url: ordre
        });
    });
});


app.get('/:locale(en|fr)', (req, res) => {
    res.setLocale(req.params.locale);
    res.cookie('langueChoisie', req.params.locale);

    res.redirect(req.get("referer"));
})


app.get('/chat', (req, res) => {
    res.render('socket_vue.ejs');
})

app.post('/rechercher', (req, res) => {
    let recherche = req.body.recherche;

    db.collection('adresse').find({
        $or: [{
            "prenom": recherche
        }, {
            "nom": recherche
        }, {
            "telephone": recherche
        }, {
            "courriel": recherche
        }]
    }).toArray(function (err, resultat) {

        if (err) return .log(err);


        res.render('listeRecherche.ejs', {
            membres: resultat
        });
    })
});

app.get('/afficher/:id', (req, res) => {
    let id = req.params.id;
    db.collection('adresse').findOne({
        "_id": ObjectID(id)
    }, function (err, resultat) {

        if (err) return console.log(err);

        res.render('adresseMembre.ejs', {
            membre: resultat
        });
    })
});

app.get('/peuplement', function (req, res) {

    let aoNouvAdd = peupler();

    let iLongueur = aoNouvAdd.length;
    for (let i = 0; i < iLongueur; i++) {

        db.collection('adresse').save(aoNouvAdd[i], (err, result) => {

            if (err) return console.log(err);
        });
    }

    res.redirect('/membres');
});

app.get('/vider', function (req, res) {


    db.collection('adresse').remove({}, (err, resultat) => {

        if (err) return console.log(err);
        res.redirect('/membres');
    });

});

let db;

MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
    if (err) return console.log(err);
    db = database.db('carnet_adresse');

    server.listen(8081, (err) => {

    })
});
