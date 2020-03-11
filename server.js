const express = require('express');
const path = require('path');
const hbs = require('express-handlebars')
var multer  = require('multer')

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, callback) {
    callback(null, file.originalname.replace(' ', '_'))
  }
});

var upload = multer({ storage: storage })

const app = express();
app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: './layouts', defaultLayout: 'main' }));
app.set('view engine', 'hbs');


app.use('/user', (req, res, next) => {
  res.send('<h1>Musisz się zalogować!</h1>')
})

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index')
});

app.get('/home', (req, res) => {
  res.render('index')
});

app.get('/about', (req, res) => {
  res.render('about')
});

app.get('/contact', (req, res) => {
  res.render('contact')
});

app.get('/history', (req, res) => {
  res.render('history', { layout: 'dark'})
});

app.get('/info', (req, res) => {
  res.render('info')
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.post('/contact/send-message', upload.single('a'), (req, res) => {
  const { author, sender, title, message, img} = req.body;

  if(author && sender && title && message) {
    res.render('contact', { isSent: true, img: req.file.originalname.replace(' ', '_') });
  }
  else {
    res.render('contact', { isError: true });
  }

});

app.use((req, res) => {
  res.status(404).send('<img src="./public/error.png" />');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});