const express = require('express');
const route = express.Router();
const mainController = require('../controllers/main');

route.get('/', mainController.getMainPage);
route.get('/about', mainController.getAboutPage);
route.get('/service', mainController.getServicesPage);
route.get('/portfolio', mainController.getProjectsPage);
module.exports = route;