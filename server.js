var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
                            ${date}
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

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
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

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
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
