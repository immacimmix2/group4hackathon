const mongoose = require("mongoose")

const riderSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    Gender: { type: String, required: true },
    NIN: { type: String, required: true },
    vehicle: { type: String, required: true },
    numberPlate: { type: String, required: true },






    //next of schema//

    Kinname: { type: String, required: true },
    kinPhoneNumber: { type: String, required: true },
    Relationship: { type: String, required: true },
    password: { type: String, required: true },
   role: { type: String, default: "driver" } 

});

module.exports = mongoose.model('Rider', riderSchema);

