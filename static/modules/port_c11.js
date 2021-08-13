function port(app) {
    app.get('/maths_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/maths.pug', params);
    });
    app.get('/sylabuss_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/sylabuss.pug', params);
    });
    app.get('/physics_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/physics.pug', params);
    });
    app.get('/chemistry_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/chemistry.pug', params);
    });
    app.get('/biology_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/biology.pug', params);
    });
    app.get('/computer_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/computer.pug', params);
    });
    app.get('/english_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/english.pug', params);
    });
    app.get('/physical_11', (req, res) =>{
        const params = {    }
        res.status(200).render('class_11/physical.pug', params);
    });
    
}

module.exports = {get_port: port} ;