const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const port = '4000'
const app = express()
const postSlide = require('./apis/slideSchema')

const nameDB = 'manex'
const passDB = 'alodmar319'
const  accessDB = 'siteIDisegn'


const mongoDB = `mongodb+srv://${accessDB}:${passDB}@cluster0.6zjao.mongodb.net/${nameDB}?retryWrites=true&w=majority`

mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true}).then(function(){
    console.log(`Conectado ao banco de dados MongoDb com sucesso!`)
}).catch(function(err){
    console.log(err.message)
    console.log('Falha na conexão com o banco de dados!')
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.engine('html',require('ejs').renderFile)
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/',(req,res)=>{
    postSlide.find({}).sort({'_id': -1}).exec(function(err,posts){
        console.log('posts do mongo: ' + posts[0])
        posts = posts.map(function(val){
            return{
                titulo:val.titulo,
                subTitulo:val.subTitulo,
                conteudo:val.conteudo,
                imagem:val.imagem,
                slug:val.slug,
                autor:val.autor,
                views:val.Number
            }
        })
        res.render('home',{posts:posts})
    })
})

app.get('/about',(req,res)=>{
    res.render('about')
})

app.get('/service',(req,res)=>{
    res.render('service')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.get('/project',(req,res)=>{
    res.render('project')
})

app.get('/blog',(req,res)=>{
    res.render('blog')
})

app.get('/single',(req,res)=>{
    res.render('single')
})

// app.get('/about',(req,res)=>{
//     res.render('about')
// })

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})