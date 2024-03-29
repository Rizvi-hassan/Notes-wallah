const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 80;

//EXPRESS SPECIFIC STUFF    ;
app.use('/static', express.static('static'));  // for serving static files
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views'));  //set the views directory



// ENDPOINTS
app.get('/', (req, res) =>{
    const params = {    }
    res.status(200).render('index.pug', params);
});

app.get('/about', (req, res) =>{
    res.status(200).render('about.pug');
});

app.get('/contributers', (req, res) =>{
    res.status(200).render('contributers.pug');
});

app.get('/contact', (req, res) =>{
    res.status(200).render('contact.pug');
});
app.get('/Dev', (req, res) =>{
    res.status(200).render('dev.pug');
});
app.get('/Goa', (req, res) =>{
    res.status(200).render('../static/dev_tools/goa project/');
});

const end_pt10 = require('./static/modules/port_c10');
end_pt10.get_port(app);

const end_pt11 = require('./static/modules/port_c11');
end_pt11.get_port(app);

const end_pt12 = require('./static/modules/port_c12');
end_pt12.get_port(app);

const end_pt11_maths = require('./static/modules/class11_sub_ch.js');
end_pt11_maths.get_port_math(app);

const end_pt11_physics = require('./static/modules/class11_sub_ch.js');
end_pt11_physics.get_port_physics(app);

const end_pt11_chemistry = require('./static/modules/class11_sub_ch.js');
end_pt11_chemistry.get_port_chemistry(app);

const end_pt11_computer = require('./static/modules/class11_sub_ch.js');
end_pt11_computer.get_port_computer(app);

const end_pt11_english1 = require('./static/modules/class11_sub_ch.js');
end_pt11_english1.get_port_english1(app);

const end_pt11_english2 = require('./static/modules/class11_sub_ch.js');
end_pt11_english2.get_port_english2(app);

const end_pt11_physical = require('./static/modules/class11_sub_ch.js');
end_pt11_physical.get_port_physical(app);

const end_pt11_bio = require('./static/modules/class11_sub_ch.js');
end_pt11_bio.get_port_bio(app);

const end_pt10_maths = require('./static/modules/class10_sub_ch.js');
end_pt10_maths.get_port_maths(app);

const end_pt10_science = require('./static/modules/class10_sub_ch.js');
end_pt10_science.get_port_science(app);

const end_pt10_english = require('./static/modules/class10_sub_ch.js');
end_pt10_english.get_port_english(app);

const end_pt10_hindi = require('./static/modules/class10_sub_ch.js');
end_pt10_hindi.get_port_hindi(app);

const end_pt10_it = require('./static/modules/class10_sub_ch.js');
end_pt10_it.get_port_it(app);

const end_pt10_sst = require('./static/modules/class10_sub_ch.js');
end_pt10_sst.get_port_sst(app);



// START THE SERVER
app.listen(port, () =>{
    console.log(`Server started on port ${port}`);
});