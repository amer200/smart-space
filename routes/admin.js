const express = require('express');
const route = express.Router();
const adminController = require('../controllers/admin');

route.get('/', adminController.getMainPage);
/********************* slider */
route.post('/add-slide', adminController.addSlider);
route.get('/remove-slide/:sId', adminController.removeSlide);
/************************** about *********************************** */
route.post('/about', adminController.about);
module.exports = route;