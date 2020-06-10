const path = require('path')
const express = require('express')
require('./src/db/mongoose')
const hbs = require('hbs')
const userRouter = require('./src/routes/user')
const invitationRouter = require('./src/routes/invitation')
const bodyparser = require('body-parser');

const app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());
const PORT = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))
app.use(express.json());
app.use(userRouter)
app.use(invitationRouter)

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })

})
app.get('/create', (req, res) => {
  res.render('invitation', { title: 'Create' })
})


app.get('/signup', (req, res) => {
  res.render('signup')

})
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' })

})

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
