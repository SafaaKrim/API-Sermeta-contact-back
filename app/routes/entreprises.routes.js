module.exports = (app) => {
    const entreprises = require('../controllers/entreprise.controller.js');
    
        // Create a new entreprise
        app.post('/entreprises', entreprises.create);
    
        // Retrieve all entreprises
        app.get('/entreprises', entreprises.findAll);
    
        // Retrieve a single entreprise with entrepriseId
        app.get('/entreprises/:entrepriseId', entreprises.findOne);
    
        // Update a entreprise with entrepriseId
        app.put('/entreprises/:entrepriseId', entreprises.update);
    
        // Delete a entreprise with entrepriseId
        app.delete('/entreprises/:entrepriseId', entreprises.delete);
    }