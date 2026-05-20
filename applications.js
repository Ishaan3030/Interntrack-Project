const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const applications = require('../../Application');

//Gets All Applications
router.get('/', (req,res) => {
    res.json(applications);
});

//Get Single Application
router.get('/:id', (req,res) => {
    const found = applications.some(applications => applications.id === parseInt(req.params.id));
    if(found) {
        res.json(applications.filter(applications => applications.id === parseInt(req.params.id)));
    }else{
      res.status(400).json({msg: `No application with the id of ${req.params.id}`});
    }
});

//Create Application
router.post('/', (req,res) => {
    const newApplication = {
        id: uuid.v4(),
        name: req.body.name,
        role: req.body.role,
        company: req.body.company,
        status: 'active'
    }
    if(!newApplication.name || !newApplication.role || !newApplication.company) {
        return res.status(400).json({msg: 'Please include a name, role, and company'});
    }

    applications.push(newApplication);
    //res.json(applications);
    res.redirect('/');
});

// Update Application
router.put('/:id', (req,res) => {
    const found = applications.some(applications => applications.id === parseInt(req.params.id));
    if(found) {
        const updateApplication = req.body;
        applications.forEach(application => {
            if(application.id === parseInt(req.params.id)) {
                application.name = updateApplication.name ? updateApplication.name : application.name;
                application.role = updateApplication.role ? updateApplication.role : application.role;
                application.company = updateApplication.company ? updateApplication.company : application.company;
                application.status = updateApplication.status ? updateApplication.status : application.status;
                res.json({msg: 'Application updated', application});
            }
        });
    }else{
        res.status(400).json({msg: `No application with the id of ${req.params.id}`});
    }
});

//Delete Application
router.delete('/:id', (req,res) => {
    const found = applications.some(applications => applications.id === parseInt(req.params.id));
    if(found) {
      res.json({msg: 'Application deleted', applications: applications.filter(application => application.id !== parseInt(req.params.id))});
    }else{
      res.status(400).json({msg: `No application with the id of ${req.params.id}`});
    }
});

module.exports = router;