const path = require('path')
const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const userRouter = require('./routes/user')


const app = express();

const PORT = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))
app.use(express.json());
app.use(userRouter)

app.get('/', (req, res) => {
 res.sendFile(path.join(publicDirectoryPath,'login.html'))
    
})

app.get('/profile', (req, res) => {
    res.render('profile-page', {
        option3:"INVITES",
        option2:"PROFILE",
        option1:"LOGOUT"
    })
})

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
