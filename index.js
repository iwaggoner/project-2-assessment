const express = require('express')
const methodOverride = require('method-override')
const { bindComplete } = require('pg-protocol/dist/messages')
const ejsLayouts = require('express-ejs-layouts')
const db = require('./models')

const app = express()

app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(express.urlencoded({extended: false}))
app.use(express.static('static'))
app.use(methodOverride('_method'))

// WRITE YOUR ROUTES HERE /////////////

app.get('/', (req, res)=>{
    db.widget.findAll ({})
    .then((foundWidget)=>{

        res.render('index.ejs', {widgets: foundWidget})
    })
})

app.post('/', (req, res)=>{
    db.widget.findOrCreate({
        where: {
            description: req.body.description,
            quantity: req.body.quantity
        }
    })
    .then((createdWidget)=>{
        res.redirect('/')
    })
})

app.delete('/', (req,res)=>{
    db.widget.destroy({
        where: {
            description: req.body.description,
            quantity: req.body.quantity
        }
    })
    .then((deletedWidget)=>{
        res.redirect('/')
    })
})

// YOUR ROUTES ABOVE THIS COMMENT /////

app.listen(process.env.PORT || 3000)