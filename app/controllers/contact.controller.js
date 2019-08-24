const contact = require('../models/contact.model.js');

// Create and Save a new contact
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "entreprise content can not be empty"
        });
    }
    // Nous utilisons le schéma contact
    // Create a contact
      const contact = new contact({
    // Nous récupérons les données reçues pour les ajouter à l'objet contact
      nom : req.body.nom,
      prenom : req.body.prenom,
      sexe : req.body.sexe,
      adresse_mail : req.body.adresse_mail,
      téléphone : req.body.téléphone,
      ville : req.body.ville,
      entreprise : req.body.entreprise  
    });
     // Save Note in the database
    contact.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};
    


// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
    contact.find()
    .then(contacts => {
        res.send(contacts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contacts."
        });
    });
}

// Find a single contact with a contactId
exports.findOne = (req, res) => {
    contacts.findById(req.params.contactId)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });            
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving contact with id " + req.params.contactId
        });
    });
};
// Update a contact identified by the contactId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "contact content can not be empty"
        });
    }

    // Find contact and update it with the request body
    contacts.findByIdAndUpdate(req.params.contactId, {
      nom : req.body.nom,
      prenom : req.body.prenom,
      sexe : req.body.sexe,
      adressemail : req.body.adressemail,
      téléphone : req.body.téléphone,
      ville : req.body.ville,
      entreprise : req.body.entreprise 
    }, {new: true})
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });
        }
        res.send(contact);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Error updating contact with id " + req.params.contactId
        });
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
    contact.findByIdAndRemove(req.params.contactId)
    .then(contact => {
        if(!contact) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });
        }
        res.send({message: "contact deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });                
        }
        return res.status(500).send({
            message: "Could not delete contact with id " + req.params.contactId
        });
    });
};