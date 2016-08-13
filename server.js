var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('advertising', ['advertising']);
var bodyParser = require('body-parser');

//var adverts = [
//    {
//        title: 'Heading 1',
//        text: 'This simple marketing / informational application.',
//        price: 100,
//        tags: 'advert 1'
//    },
//    {
//        title: 'Heading 2',
//        text: 'This simple marketing / informational application.',
//        price: 200,
//        tags: 'advert 2'
//    },
//    {
//        title: 'Heading 3',
//        text: 'This simple marketing / informational application.',
//        price: 300,
//        tags: 'advert 3'
//    }
//];

app.use(express.static(__dirname + '/app'));
app.use('/node_modules', express.static('node_modules'));
app.use('/app', express.static('app'));
app.use(bodyParser.json());

app.get('/api/adverts', function(req, res){
    db.advertising.find(function(err, docs){
        if(err)
            throw err;
        res.json(docs);
    });
});

app.post('/api/advert', function(req, res){
    if (!req.body) return res.sendStatus(400);
    db.advertising.insert(req.body, function(err, doc){
        if(err)
            throw err;
        res.json(doc);
    });
});

app.delete('/api/advert/:id', function(req, res){
    var id = req.params.id;
    db.advertising.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
        if(err)
            throw err;
        res.json(doc);
    });
});

app.get('/api/advert/:id', function(req, res){
    var id = req.params.id;
    db.advertising.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
        if(err)
            throw err;
        res.json(doc);
    });
});

app.put('/api/advert/:id', function(req, res){
    var id = req.params.id;
    db.advertising.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {title: req.body.title, text: req.body.text, price: req.body.price, tags: req.body.tags}},
        new: true
    }, function(err, doc) {
            if (err)
                throw err;
            res.json(doc);
    });
});

app.listen('3333', function(){
    console.log('Server is running');
});