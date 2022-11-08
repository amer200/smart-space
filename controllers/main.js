const Slider = require('../models/slider');
const About = require('../models/about');
exports.getMainPage = async (req, res) => {
    const slides = await Slider.find();
    const about = await About.findOne();
    res.render('main/index', {
        slides: slides,
        about: about
    });
}