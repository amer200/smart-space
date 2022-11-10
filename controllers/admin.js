const Slider = require('../models/slider');
const About = require('../models/about');
const Serv = require('../models/serv');
const Project = require('../models/project');
const Projectcateg = require('../models/projectcateg');
const Faq = require('../models/faq');
const fs = require('fs');
exports.getMainPage = async (req, res) => {
    const slides = await Slider.find();
    const about = await About.findOne();
    const servs = await Serv.find();
    const projects = await Project.find();
    const projectcateg = await Projectcateg.find();
    const faq = await Faq.find();
    res.render('admin/index', {
        slides: slides,
        about: about,
        servs: servs,
        projects: projects,
        categs: projectcateg,
        faqs: faq
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
                    a.img = req.file.path.split('public')[1];
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
    const categ = req.body.categ;
    const img = req.file.path.split('public')[1];
    const project = new Project({
        name: name,
        desc: desc,
        categ: categ,
        img: img
    })
    project.save()
        .then(s => {
            res.redirect('/admin');
        })
        .catch(err => {
            console.log(err)
        })
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
exports.removeProjectCateg = (req, res) => {
    const id = req.params.id;
    Projectcateg.findByIdAndRemove(id)
        .then(p => {
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeProject = (req, res) => {
    const id = req.params.id;
    Project.findByIdAndRemove(id)
        .then(p => {
            fs.unlink(`public${p.img}`, (err) => {
                console.log(err)
            })
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}
exports.addFaq = (req, res) => {
    const qu = {
        ar: req.body.qar,
        en: req.body.qen
    };
    const aw = {
        ar: req.body.war,
        en: req.body.wen
    }
    const faq = new Faq({
        q: qu,
        w: aw
    })
    faq.save()
        .then(f => {
            res.redirect('/admin')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.removeFaq = (req, res) => {
    const id = req.params.id;
    Faq.findByIdAndRemove(id)
        .then(p => {
            res.send({
                msg: 'ok'
            })
        })
        .catch(err => {
            console.log(err)
        })
}