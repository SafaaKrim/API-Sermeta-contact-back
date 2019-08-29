const Entreprises = require('../models/entreprise.model.js');

// Create and Save a new entreprise
exports.create = (req, res) => {
   // Create a entreprise
    const entreprises = new Entreprises({
        dénomination: req.body.dénomination ,
        finalité: req.body.finalité,
        taille: req.body.taille,
        statut_juridique: req.body.statut_juridique,
        natinalité: req.body.natinalité,
        ville: req.body.ville,
        entreprise: req.body.entreprise
    });

    // Save entreprise in the database
    entreprises.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the entreprise."
        });
    });
};

// Retrieve and return all entreprises from the database.
exports.findAll = (req, res) => {
    Entreprises.find()
    .then(entreprises => {
        res.send(entreprises);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving entreprises."
        });
    });
};

// Find a single entreprise with a entrepriseId
exports.findOne = (req, res) => {
    Entreprises.findById(req.params.entrepriseId)
    .then(entreprises => {
        if(!entreprises) {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });            
        }
        res.send(entreprises);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving entreprise with id " + req.params.entrepriseId
        });
    });
};
// Update a entreprise identified by the entrepriseId in the request
exports.update = (req, res) => {
    Entreprises.updateOne(req.params.entrepriseID)
     .then(entreprises => {
         if(!entreprises) {
             return res.status(404).send({
                 message: "entreprise not found with id " + req.params.entrepriseId
             });
         }
         res.send(entreprise);
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "entreprise not found with id " + req.params.entrepriseId
             });                
         }
         return res.status(500).send({
             message: "Error updating entreprise with id " + req.params.entrepriseId
         });
     });
 };
// Delete a entreprise with the specified entrepriseId in the request
exports.delete = (req, res) => {
    Entreprise.findByIdAndRemove(req.params.entrepriseId)
    .then(entreprise => {
        if(!entreprise) {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });
        }
        res.send({message: "entreprise deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "entreprise not found with id " + req.params.entrepriseId
            });                
        }
        return res.status(500).send({
            message: "Could not delete entreprise with id " + req.params.entrepriseId
        });
    });
};
