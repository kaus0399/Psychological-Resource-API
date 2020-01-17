const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Geographical Location Schema 

const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        index:'2dsphere'
    }

}); 


//create Psychres Schema & Model

const PsychresSchema = new Schema({
    name: {
        type: String,
        required:[true,'Name field is required']

    },
    hours:{
        type: String
    },

    geometry: GeoSchema
    

    //add in geographical location of the psychological resource
});

const Psychres = mongoose.model('Psychres', PsychresSchema);
 
module.exports = Psychres;
