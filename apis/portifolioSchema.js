const mongoose = require('mongoose')
const Schema = mongoose.Schema

const portifolioSchema = new Schema({
    category:String,
    projectName:String,
    image:String
},{collection:'portifolioPosts'})

const portifolioPosts = mongoose.model('portifolioPosts', portifolioSchema)

module.exports = portifolioPosts