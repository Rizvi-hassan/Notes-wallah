function port(app) {
    app.get('/maths_12', (req, res) =>{
        const params = {    }
        res.status(200).render('class_12/maths.pug', params);
    });
    app.get('/physics_12', (req, res) =>{
        const params = {    }
        res.status(200).render('class_12/physics.pug', params);
    });
    app.get('/chemistry_12', (req, res) =>{
        const params = {    }
        res.status(200).render('class_12/chemistry.pug', params);
    });
    app.get('/biology_12', (req, res) =>{
        const params = {    }
        res.status(200).render('class_12/biology.pug', params);
    });
    app.get('/computer_12', (req, res) =>{
        const params = {    }
        res.status(200).render('class_12/computer.pug', params);
    });
    app.get('/english_12', (req, res) =>{
        const params = {    }
        res.status(200).render('class_12/english.pug', params);
    });
    app.get('/physical_12', (req, res) =>{
        const params = {    }
        res.status(200).render('class_12/physical.pug', params);
    });
    
}

module.exports = {get_port: port} ;