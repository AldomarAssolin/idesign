const mongoose = require('mongoose')
const Schema = mongoose.Schema

const slideSchema = new Schema({
    titulo:String,
    subTitulo:String,
    imagem:String,
    conteudo:String,
    slug:String,
    autor:String,
    views:Number
},{collection:'postSlide'})

const PostsSlide = mongoose.model('PostsSlide', slideSchema)

module.exports = PostsSlide