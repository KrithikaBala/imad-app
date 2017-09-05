var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: "abikirthi",
    database: "abikirthi",
    host: "db.imad.hasura-app.io",
    port: "5432",
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json())

var articles = {
    'article-one': {
        title: "Article-One | Food",
        heading:  "Article-One",
        date: "Sep 03, 2017",
        content: `<p>In this article, we are going to talk about various types of foods. In India, people give much importance to the food. There are so many varities of food available in India. The north indian dishes are different from the south indian dishes</p>
                    <p>Wheat is the primary food of North India. Some of the popular north indian dishes are:</p>
                     <ol>
                         <li>Roti</li>
                         <li>Phulka</li>
                         <li>Poha</li>
                         <li>Dhaal</li>
                         <li>Aloo sabji</li>
                     </ol>
                    
                    <p>Rice is the primary food of South India. Some of the popular north indian dishes are:</p>
                     <ol>
                         <li>Rice</li>
                         <li>Sambhar</li>
                         <li>Idly</li>
                         <li>Dosa</li>
                         <li>Vegetable Curries</li>
                     </ol>`
    },
    'article-two': {
        title: "Article-Two | Travel",
        heading:  "Article-Two",
        date: "Sep 04, 2017",
        content: `<p>In this article, we are going to talk about different places to visit in India. Some of the key places to visit in India are 
                Taj Mahal (Agra), Aksharadham Temple (Delhi), Gateway of India (Mumbai), Howrah Bridge (Kolkata), Brindavan Garden (Bangalore), 
                Meenakshi Amman Temple (Madurai) and so on
                </p>`
    },
    'article-three': {
        title: "Article-Three | Languages",
        heading:  "Article-Three",
        date: "Sep 05, 2017",
        content: `<p>In this article, we are going to talk about different languages spoken in India. Some of the languages are: </p>
                <ol>
                <li>Hindi</li>
                <li>Tamil</li>
                <li>Telugu</li>
                <li>Kannada</li>
                <li>Malayalam</li>
                <li>Gujarati</li>
                <li>Sanskrit</li>
                </ol>`  
    }
};

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
            <html>
                <head>
                    <title>
                        ${title}
                    </title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="/ui/style.css" rel="stylesheet" />
                </head>
                <body>
                    <div class = "container">
                        <div>
                            <a href="/">Home</a>
                        </div>
                        <hr/>
                        <h3>
                            ${heading}
                        </h3>
                        <div>
                            ${date.toDateString()}
                        </div>
                        <div>
                            ${content}
                        </div>
                        <hr/>
                        <div class = "footer" id = "footer">
                          <input type = "text" id = "comments" placeholder = "comments"/>
                          <input type = "submit" id = "comments_btn" value = "Enter your Comments"/>
                        </div>
                </body>
            </html>
            `;
    
    return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

function hash(input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res) {
    var hashedString = hash(req.params.input, "some-random-value");
    res.send(hashedString);
});

var Pool = new Pool(config);
app.get('/test-db', function (req, res) {
    Pool.query("SELECT * FROM test_db", function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    });
});

app.post('/create-user', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    
    Pool.query('INSERT into "user" (username, password) values $1, $2', [username, dbString], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send("User successfully created!!!" + username);
        }
    });
});


app.post('/login', function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    Pool.query('SELECT * FROM "user" WHERE username = $1', [username], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(403).send("username invalid");
            }
            else{
                var dbString = result.rows[0].password;
                var salt = dbString.split('$')[2];
                var hashedPassword = hash(password, salt);
                if(hashedPassword == dbString){
                    res.send("User successfully logged in");
                }else{
                        res.send("Invalid Password"); 
                }
            }

        }
    });
});

var names = []
app.get('/submit-name', function (req, res) {
  var name = req.query.name;
  names.push(name);
  res.send(JSON.stringify(names));
});

var commentslist = []
app.get('/article/submit-comments', function (req, res) {
  var comment = req.query.name;
  commentslist.push(comment);
  res.send(JSON.stringify(commentslist));
});

app.get('/article', function (req, res) {
    //var articleName = req.params.articleName;
    //res.send(createTemplate(articles[articleName]));
  res.sendFile(path.join(__dirname, 'ui', 'article.html'));
});

app.get('/articles/:articleName', function (req, res) {
    //var articleName = req.params.articleName;
    Pool.query("SELECT * from article WHERE title = $1", [req.params.articleName], function(err, result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            if(result.rows.length === 0){
                res.status(404).send("Article not found");
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
    //res.send(createTemplate(articles[articleName]));
  // res.sendFile(path.join(__dirname, 'ui', 'Article-one.html'));
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/article.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article.js'));
});

app.get('/ui/login.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/Tulips.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Tulips.jpg'));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
