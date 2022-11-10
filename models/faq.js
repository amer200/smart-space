const mongoose = require('mongoose');

const faqSchema = mongoose.Schema({
    q: {
        ar: String,
        en: String
    },
    w: {
        ar: String,
        en: String
    }
})

module.exports = mongoose.model('faq', faqSchema);