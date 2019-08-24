const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
      nom : String,
      prenom : String,
      sexe : String,
      adresse_mail : String,
      téléphone : String,
      ville : String,
      entreprise : String   
}, {
    timestamps: true
});



module.exports = mongoose.model('contacts', ContactSchema);



