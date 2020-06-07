var mongoose = require('mongoose');

// var TextSchema = new mongoose.Schema({
//   textContent:String, 
//   xpos:Number, 
//   ypos: Number, 
//   textcolor: String, 
//   textFont:String, 
//   textSize:Number
// })
//add all properties of logo
var LogoSchema = new mongoose.Schema({
  id: String,
  text:{type: String, minlength:1, trim:true},
  color: String,
  fontSize: { type: Number, min: 1, max: 144 },
  backgroundColor: String,
  borderColor:String,
  borderRadius:{ type: Number, min: 1, max: 144 },
  borderWidth:{ type: Number, min: 1, max: 144 },
  padding:{ type: Number, min: 1, max: 144 },
  margin: { type: Number, min: 1, max: 144 },
  width:{type:Number, min:1},
  height:{type:Number, min:1},
  lastUpdate: { type: Date, default: Date.now },
  //textList : [new mongoose.Schema({textContent:String})]
  textList:[{
    textContent:String, 
    xpos:Number, 
    ypos: Number, 
    textcolor: String, 
    textFont:String, 
    textSize:Number
  }]
});

module.exports = mongoose.model('Logo', LogoSchema);