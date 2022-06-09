const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    userID: {type: Object, required: true, unique: true},
    expenses: {type: Array, required: true}
})

module.exports = model('Finance', schema)