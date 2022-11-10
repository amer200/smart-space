const express = require('express');
const route = express.Router();
const adminController = require('../controllers/admin');
const about = require('../models/about');

route.get('/', adminController.getMainPage);
/********************* slider */
route.post('/add-slide', adminController.addSlider);
route.get('/remove-slide/:sId', adminController.removeSlide);
/************************** about *********************************** */
route.post('/about', adminController.about);
/********************************services *****************************/
route.post('/add-serv', adminController.addServ);
route.get('/remove-serv/:id', adminController.removeServ);
/****************************projects *********************************/
route.post('/add-project-categ', adminController.addProjectCateg);
route.get('/remove-project-categ/:id', adminController.removeProjectCateg);
route.post('/add-project', adminController.addProject)
route.get('/remove-project/:id', adminController.removeProject)
/****************************add-faq *************************************/
route.post('/add-faq', adminController.addFaq);
route.get('/remove-faq/:id', adminController.removeFaq);
module.exports = route;