const Slider = require('../models/slider');
const About = require('../models/about');
const Serv = require('../models/serv');
const Projectcateg = require('../models/projectcateg');
const Project = require('../models/project');
const Faq = require('../models/faq');
const nodemailer = require("nodemailer");
exports.getMainPage = async (req, res) => {
    const slides = await Slider.find();
    const about = await About.findOne();
    const servs = await Serv.find();
    const faq = await Faq.find();
    const middleIndex = Math.ceil(faq.length / 2);
    const faqs1 = faq.splice(0, middleIndex);
    const faqs2 = faq.splice(-middleIndex);
    if (req.session.lang == 'ar') {
        res.render('main-ar/index', {
            slides: slides,
            about: about,
            servs: servs,
            faqs1: faqs1,
            faqs2: faqs2
        });
    } else {
        res.render('main/index', {
            slides: slides,
            about: about,
            servs: servs,
            faqs1: faqs1,
            faqs2: faqs2
        });
    }
}

exports.getServicesPage = async (req, res) => {
    const servs = await Serv.find();
    const faq = await Faq.find();
    const middleIndex = Math.ceil(faq.length / 2);
    const faqs1 = faq.splice(0, middleIndex);
    const faqs2 = faq.splice(-middleIndex);
    if (req.session.lang == 'ar') {
        res.render('main-ar/service', {
            servs: servs,
            faqs1: faqs1,
            faqs2: faqs2
        })
    } else {
        res.render('main/service', {
            servs: servs,
            faqs1: faqs1,
            faqs2: faqs2
        })
    }
}
exports.getAboutPage = async (req, res) => {
    const about = await About.findOne();
    const faq = await Faq.find();
    const middleIndex = Math.ceil(faq.length / 2);
    const faqs1 = faq.splice(0, middleIndex);
    const faqs2 = faq.splice(-middleIndex);
    if (req.session.lang == 'ar') {
        res.render('main-ar/about', {
            about: about,
            faqs1: faqs1,
            faqs2: faqs2
        })
    } else {
        res.render('main/about', {
            about: about,
            faqs1: faqs1,
            faqs2: faqs2
        })
    }
}
exports.getProjectsPage = async (req, res) => {
    const projects = await Project.find().populate('categ');
    const projectcateg = await Projectcateg.find();
    if (req.session.lang == 'ar') {
        res.render('main-ar/portfolio', {
            projects: projects,
            categs: projectcateg
        })
    } else {
        res.render('main/portfolio', {
            projects: projects,
            categs: projectcateg
        })
    }
}
exports.getCntactPage = (req, res) => {
    if (req.session.lang == 'ar') {
        res.render('main-ar/contact')
    } else {
        res.render('main/contact')
    }
}
exports.postContact = (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const subj = req.body.subj;
    const msg = req.body.msg;
    async function main() {
        // let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            secure: true,
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
                ciphers: 'SSLv3'
            },
            requireTLS: true,
            port: 465,
            debug: true,
            auth: {
                user: process.env.MAILUSERNAME,
                pass: process.env.MAILPASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: `from: ${name}, ${mail}`,
            to: "info@smartspace.live",
            subject: subj,
            text: msg,
        });

        // console.log("Message sent: %s", info.messageId);

        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
    main()
        .then(m => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}
exports.changeLang = (req, res) => {
    const l = req.params.l;
    req.session.lang = l;
    res.redirect('/')
}