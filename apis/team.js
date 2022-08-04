const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    name:String,
    office:String,
    image:String,
    link1:String,
    link2:String,
    link3:String,
    icon1:String,
    icon2:String,
    icon3:String
},{collection:'team'})

const TeamSchema = mongoose.model('TeamSchema', teamSchema)

module.exports = TeamSchema