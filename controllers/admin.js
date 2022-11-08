const Slider = require('../models/slider');
const About = require('../models/about');
const Serv = require('../models/serv');
const Project = require('../models/project');
const Projectcateg = require('../models/projectcateg');
const fs = require('fs');
exports.getMainPage = async (req, res) => {
    const slides = await Slider.find();
    const about = await About.findOne();
    const servs = await Serv.find();
    const projects = await Project.find();
    res.render('admin/index', {
        slides: slides,
        about: about,
        servs: servs,
        projects: projects
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
exports.addServ = (req, res) => {
    const img = req.file.path.split('public')[1];
    const title = {
        ar: req.body.titlear,
        en: req.body.titleen
    };
    const contetn = {
        ar: req.body.ar,
        en: req.body.en
    }
    const serv = new Serv({
        img: img,
        title: title,
        contetn: contetn
    })
    serv.save()
        .then(s => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeServ = (req, res) => {
    const id = req.params.id;
    Serv.findByIdAndRemove(id)
        .then(s => {
            fs.unlink(`public${s.img}`, (err) => {
                console.log(err)
            })
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.addProject = (req, res) => {
    const name = {
        ar: req.body.namear,
        en: req.body.nameen
    };
    const desc = {
        ar: req.body.descar,
        en: req.body.descen
    };
    const categ = {
        ar: req.body.categar,
        en: req.body.categen
    }
    const img = req.file.path.split('public')[1];
}
exports.addProjectCateg = (req, res) => {
    const ar = req.body.ar;
    const en = req.body.en;
    const categ = new Projectcateg({
        ar: ar,
        en: en
    })
    categ.save()
        .then(c => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
}