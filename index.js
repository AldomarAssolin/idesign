const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const port = 4000
const app = express()
const postSlide = require('./apis/slideSchema')
const portifolioPosts = require('./apis/portifolioSchema')
const team = require('./apis/team')


const chalk = require('chalk')

const nameDB = 'manex'
const passDB = 'alodmar319'
const accessDB = 'siteIDisegn'
const cluster = 'cluster0.6zjao'

//mongodb+srv://<userDataBase>:<password>@<cluster>.mongodb.net/<dataBaseName>?retryWrites=true&w=majority

const mongoDB = `mongodb+srv://${accessDB}:${passDB}@${cluster}.mongodb.net/${nameDB}?retryWrites=true&w=majority`

mongoose.connect(mongoDB,{useNewUrlParser:true,useUnifiedTopology:true}).then(function(){
    console.log(chalk.green(`Conectado ao banco de dados MongoDb com sucesso!`))
}).catch(function(err){
    console.log(chalk.red(err.message))
    console.log(chalk.red('Falha na conexão com o banco de dados!'))
})

app.use(bodyParser.json());         // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.engine('html',require('ejs').renderFile)
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/about',(req,res)=>{
    team.find({}).exec((err,postsTeam)=>{
        postsTeam = postsTeam.map((val)=>{
            return{
                name:val.name,
                office:val.office,
                image:val.image,
                link1:val.link1,
                link2:val.link2,
                link3:val.link4,
                icon1:val.icon1,
                icon2:val.icon2,
                icon3:val.icon3
            }
        })
        res.render('about',{postsTeam:postsTeam})
    })
})

app.get('/service',(req,res)=>{
    res.render('service')
})

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.get('/project', (req,res)=>{
    portifolioPosts.find({}).exec((err,postsPort)=>{
        postsPort = postsPort.map((val)=>{
            return{
                category:val.category,
                projectName:val.projectName,
                image:val.image
            }
        })
        res.render('project',{postsPort:postsPort})
    })
})

app.get('/blog',(req,res)=>{
    res.render('blog')
})

app.get('/single',(req,res)=>{
    res.render('single')
})

app.get('/',(req,res)=>{
    postSlide.find({}).sort({'_id': -1}).exec(function(err,posts){
        //console.log('posts do mongo: ' + posts[0])
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
        
        portifolioPosts.find({}).sort({'_id': -1}).limit(6).exec((err,postsPort)=>{
            postsPort = postsPort.map((val)=>{
                return{
                    category:val.category,
                    projectName:val.projectName,
                    image:val.image
                }
            })
            team.find({}).exec((err,postsTeam)=>{
                postsTeam = postsTeam.map((val)=>{
                    return{
                        name:val.name,
                        office:val.office,
                        image:val.image,
                        link1:val.link1,
                        link2:val.link2,
                        link3:val.link4,
                        icon1:val.icon1,
                        icon2:val.icon2,
                        icon3:val.icon3
                    }
                })
                res.render('home',{posts:posts,postsPort:postsPort,postsTeam:postsTeam})
            })
        })
    })
})

//usar o express.Router(), para definir as rotas.



app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`)
})