const Contacts = require('../models/contact.model.js');

// Create and Save a new contact
exports.create = (req, res) => {
    // Create a contact
   const contacts = new Contacts({
 // Nous récupérons les données reçues pour les ajouter à l'objet contact
   nom : req.body.nom,
   prenom : req.body.prenom,
   sexe : req.body.sexe,
   adresse_mail : req.body.adresse_mail,
   telephone : req.body.telephone,
   ville : req.body.ville,
   entreprise : req.body.entreprise  
 });
  // Save Note in the database
 contacts.save()
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
    Contacts.find()
    .then(contacts => {
        res.send(contacts);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving contacts."
        });
    });
};

// Find a single contact with a contactId
exports.findOne = (req, res) => {
    Contacts.findById(req.params.contactId)
    .then(contacts => {
        if(!contacts) {
            return res.status(404).send({
                message: "contact not found with id " + req.params.contactId
            });            
        }
        res.send(contacts);
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
    const { body } = req;
    console.log("Updating body:", body);
    const {contactId} = req.params;
    if (!contactId) return res.status(404).send({message: "Missing parameter"});

    console.log("Updating using contact id:", contactId); 
    Contacts.updateOne({
        _id:    contactId
   },body)
    .then(contacts => {
        if(!contacts) {
            return res.status(404).send({
                message: "contact not found with id " + contactId
            });
        }
        res.send(contacts);
    }).catch(err => {
        return res.status(500).send(err);
    });
};

// Delete a contact with the specified contactId in the request
exports.delete = (req, res) => {
    Contacts.findByIdAndRemove(req.params.contactId)
    .then(contacts => {
        if(!contacts) {
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
