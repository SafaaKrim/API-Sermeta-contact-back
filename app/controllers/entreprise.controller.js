const entreprise = require('../models/entreprise.model.js');

// Create and Save a new entreprise
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "entreprise content can not be empty"
        });
    }

    // Create a entreprise
    const entreprise = new entreprise({
        dénomination: req.body.dénomination ,
        finalité: req.body.finalité,
        taille: req.body.taille,
        statut_juridique: req.body.statut_juridique,
        natinalité: req.body.natinalité,
        ville: req.body.ville,
        contact: req.body.contact
    });

    // Save entreprise in the database
    entreprise.save()
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
    entreprise.find()
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
    entreprise.findById(req.params.entrepriseId)
    .then(entreprise => {
        if(!entreprise) {
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
            message: "Error retrieving entreprise with id " + req.params.entrepriseId
        });
    });
};
// Update a entreprise identified by the entrepriseId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "entreprise content can not be empty"
        });
    }

    // Find entreprise and update it with the request body
    entreprise.findByIdAndUpdate(req.params.entrepriseId, {
        denomination: req.body.denomination ,
        finalité: req.body.finalité,
        taille: req.body.taille,
        statut_juridique: req.body.tatut_juridique,
        natinalité: req.body.natinalité,
        ville: req.body.ville,
        contact: req.body.contact
    }, {new: true})
    .then(entreprise => {
        if(!entreprise) {
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
    entreprise.findByIdAndRemove(req.params.entrepriseId)
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