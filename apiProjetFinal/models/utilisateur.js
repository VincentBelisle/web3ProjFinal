const { isEmail } = require('validator')
const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    "email": {
    type: "String", required : [true,'Le courriel est requis'], unique: true,validator: [isEmail, 'Courriel invalide']
    },
    "password": {
    type: "String", required : [true, 'Le mot de passe est requis'], validator: function (value){
        return value.length > 5;
    },
    message: 'Le mot de passe doit contenir au moins 6 caractères'
    },
    "token": {
    type: "String"
    }
});
     
module.exports = mongoose.model('Utilisateur', userSchema)