const Slider = require('../models/slider');
const About = require('../models/about');
const Serv = require('../models/serv');
const Projectcateg = require('../models/projectcateg');
const Project = require('../models/project');
const Faq = require('../models/faq');
exports.getMainPage = async (req, res) => {
    const slides = await Slider.find();
    const about = await About.findOne();
    const servs = await Serv.find();
    const faq = await Faq.find();
    const middleIndex = Math.ceil(faq.length / 2);
    const faqs1 = faq.splice(0, middleIndex);
    const faqs2 = faq.splice(-middleIndex);
    res.render('main/index', {
        slides: slides,
        about: about,
        servs: servs,
        faqs1: faqs1,
        faqs2: faqs2
    });
}

exports.getServicesPage = async (req, res) => {
    const servs = await Serv.find();
    const faq = await Faq.find();
    const middleIndex = Math.ceil(faq.length / 2);
    const faqs1 = faq.splice(0, middleIndex);
    const faqs2 = faq.splice(-middleIndex);
    res.render('main/service', {
        servs: servs,
        faqs1: faqs1,
        faqs2: faqs2
    })
}
exports.getAboutPage = async (req, res) => {
    const about = await About.findOne();
    const faq = await Faq.find();
    const middleIndex = Math.ceil(faq.length / 2);
    const faqs1 = faq.splice(0, middleIndex);
    const faqs2 = faq.splice(-middleIndex);
    res.render('main/about', {
        about: about,
        faqs1: faqs1,
        faqs2: faqs2
    })
}
exports.getProjectsPage = async (req, res) => {
    const projects = await Project.find().populate('categ');
    const projectcateg = await Projectcateg.find();
    res.render('main/portfolio', {
        projects: projects,
        categs: projectcateg
    })
}
exports.getCntactPage = (req, res) => {
    res.render('main/contact')
}