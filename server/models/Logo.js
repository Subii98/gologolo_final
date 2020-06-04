var mongoose = require('mongoose');

//add all properties of logo
var LogoSchema = new mongoose.Schema({
  id: String,
  //text: String,
  text:{type: String, minlength:1, trim:true},
  color: String,
  fontSize: { type: Number, min: 1, max: 144 },
  backgroundColor: String,
  borderColor:String,
  borderRadius:{ type: Number, min: 1, max: 144 },
  borderWidth:{ type: Number, min: 1, max: 144 },
  padding:{ type: Number, min: 1, max: 144 },
  margin: { type: Number, min: 1, max: 144 },
  lastUpdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Logo', LogoSchema);