const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const applications = require('./Application');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//static folder
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('index', {title: 'InternTrack', applications});
});

//app.use(logger);
app.use('/api/applications', require('./routes/api/applications'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'healthcheck.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));