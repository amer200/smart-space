const Slider = require('../models/slider');
const About = require('../models/about');
const Serv = require('../models/serv');
exports.getMainPage = async (req, res) => {
    const slides = await Slider.find();
    const about = await About.findOne();
    const servs = await Serv.find();
    res.render('main/index', {
        slides: slides,
        about: about,
        servs: servs
    });
}

exports.getServicesPage = async (req, res) => {
    const servs = await Serv.find();
    res.render('main/service', {
        servs: servs
    })
}
exports.getAboutPage = async (req, res) => {
    const about = await About.findOne();
    res.render('main/about', {
        about: about
    })
}
exports.getProjectsPage = async (req, res) => {
    res.render('main/portfolio')
}