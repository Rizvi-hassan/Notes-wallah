function port(app) {
    app.get('/maths_10', (req, res) =>{
        const params = {    }
        res.status(200).render('class_10/maths.pug', params);
    });
    app.get('/sylabuss_10', (req, res) =>{
        const params = {    }
        res.status(200).render('class_10/sylabuss.pug', params);
    });
    app.get('/science_10', (req, res) =>{
        const params = {    }
        res.status(200).render('class_10/science.pug', params);
    });
    app.get('/english_10', (req, res) =>{
        const params = {    }
        res.status(200).render('class_10/english.pug', params);
    });
    app.get('/hindi_10', (req, res) =>{
        const params = {    }
        res.status(200).render('class_10/hindi.pug', params);
    });
    app.get('/IT_10', (req, res) =>{
        const params = {    }
        res.status(200).render('class_10/IT.pug', params);
    });
    app.get('/sst_10', (req, res) =>{
        const params = {    }
        res.status(200).render('class_10/sst.pug', params);
    });

}

module.exports = {get_port: port} ;