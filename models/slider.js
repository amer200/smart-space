const mongoose = require('mongoose');


const slideSchema = mongoose.Schema({
    img: String,
    titleone: {
        ar: String,
        en: String
    },
    titletwo: {
        ar: String,
        en: String
    }
})

module.exports = mongoose.model('Slide', slideSchema);