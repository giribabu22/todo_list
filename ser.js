const exp = require('express');
const knex = require('./src/KnexCon');
const ResClass = require('./classes/home');

const obj = new ResClass()

const app = exp()

app.use(exp.json())
app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(exp.urlencoded())

app.post('/regis', obj.regis_POST)

app.get('/regis', (req, res) => {
    res.render('regi.hbs')
})
app.get('/home', (req, res) => {
    res.render('home.hbs')
})

app.get('/all', async (req, res) => {
    let data = {}
    data['does_data'] = await knex('does_table').select()
    data['register'] = await knex('register').select()
    res.json(data)
})
app.get('/del/:name', (req, res) => {
    let {name} = req.params
    knex('does_table').where('name',name.slice(1,name.length)).delete().then(data => {
        res.redirect('/home')
    })
})

app.get('/create_do', (req, res) => {
    res.render('meeting')
})
app.post('/create_do', obj.create_do_POST)

module.exports = app