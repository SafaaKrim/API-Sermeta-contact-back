const mongoose = require('mongoose');

const entrepriseSchema = mongoose.Schema({
    dénomination: String,
    finalité: String,
    taille: String,
    statut_juridique:String,
    natinalité: String,
    ville: String,
    contact: String
}, {
    timestamps: true
});

module.exports = mongoose.model('entreprises', entrepriseSchema);