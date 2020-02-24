const Entreprises = require('../models/entreprise.model.js');

// Create and Save a new entreprise
exports.create = (req, res) => {
   // Create a entreprise
    const entreprises = new Entreprises({
        denomination: req.body.denomination ,
        finalite: req.body.finalite,
        taille: req.body.taille,
        statut_juridique: req.body.statut_juridique,
        natinalite: req.body.natinalite,
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
    const { body } = req;
    console.log("Updating body:", body);
    const {entrepriseId} = req.params;
    if (!entrepriseId) return res.status(404).send({message: "Missing parameter"});

    console.log("Updating using entreprise id:", entrepriseId); 
    Entreprises.updateOne({
        _id :  entrepriseId
    },body)
     .then(updatedEnterprise => {
         if(!updatedEnterprise) {
             return res.status(404).send({
                 message: "entreprise not found with id " + entrepriseId
             });
         }
         res.send(updatedEnterprise);
     }).catch(err => {
         
        return res.status(500).send(err);
             
         });
   
 };
// Delete a entreprise with the specified entrepriseId in the request
exports.delete = (req, res) => {
    if (!req.params.entrepriseId) return res.status(404).send({
        message: "Missing parameter enterprise Id "
    });
    Entreprises.findByIdAndRemove(req.params.entrepriseId)
    .then(deletedEnterprise => {
        if(!deletedEnterprise) {
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
