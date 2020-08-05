const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
const partialPath = path.join(__dirname, '../views/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(partialPath);

//Serving static files
app.use(express.static(publicPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Utkarsh"
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Utkarsh"
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Search the place whose weather data you want",
        title: "Help",
        name: "Utkarsh"
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address query is required'
        });
    }
    const address = req.query.address;
    geoCode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send({
                forecast: data,
                location,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'There is some error'
        });
    }
    console.log(req.query);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: "404",
        error: "Page not found",
        name: 'Utkarsh'
    });
});


app.get('*', (req, res) => {
    res.render('404page', {
        title: "404",
        error: "Page not found",
        name: 'Utkarsh'
    });
});

app.listen(port, () => { console.log('Server is up on port 3000'); })