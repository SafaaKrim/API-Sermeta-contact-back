const mongoose = require('mongoose');

const EntrepriseSchema = mongoose.Schema({
    denomination: String,
    finalite: String,
    taille: String,
    statut_juridique:String,
    natinalite: String,
    ville: String,
    contact: String
}, {
    timestamps: true
});

module.exports = mongoose.model('entreprises',  EntrepriseSchema);