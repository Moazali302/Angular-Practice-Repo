const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  country:{type:String,required:true},
  city: { type: String, required: true },
  registredOn:{type:Date,default:Date.now}
}
);

module.exports = mongoose.model('User', userSchema);
