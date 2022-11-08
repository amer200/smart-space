const Slider = require('../models/slider');
const About = require('../models/about');
const fs = require('fs');
exports.getMainPage = async (req, res) => {
    const slides = await Slider.find();
    const about = await About.findOne();
    res.render('admin/index', {
        slides: slides,
        about: about
    });
}
exports.addSlider = (req, res) => {
    const titleone = {
        ar: req.body.title1ar,
        en: req.body.title1en,
    };
    const titletwo = {
        ar: req.body.title2ar,
        en: req.body.title2en,
    };
    const img = req.file.path.split('public')[1];
    const slide = new Slider({
        titleone: titleone,
        titletwo: titletwo,
        img: img
    });
    slide.save()
        .then(s => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeSlide = (req, res) => {
    const sId = req.params.sId;
    Slider.findByIdAndRemove(sId)
        .then(s => {
            fs.unlink(`public${s.img}`, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.about = (req, res) => {
    const ar = req.body.ar;
    const en = req.body.en;
    About.findOne()
        .then(a => {
            if (a) {
                a.ar = ar;
                a.en = en;
                if (req.file) {
                    fs.unlink(`public${a.img}`, err => {
                        if (err) {
                            console.log(err)
                        }
                    })
                    a.img = req.file.path;
                }
                return a.save()
            } else {
                const a = new About({
                    ar: ar,
                    en: en,
                    img: req.file.path.split('public')[1]
                })
                return a.save()
            }
        })
        .then(a => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}