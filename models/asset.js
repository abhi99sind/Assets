const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const assetSchema = new Schema({
  random:{
    type:String,
  },
  assetName:{
    type:String,
    // required: true
  },
  uploaderName:{
    type:String,
    // required: true
  },
  description:{
    type:String,
    // required: true
  },
  price:{
    type:Number,
    // required: true
  },
  MainFile:{
    type:Array,
    // required:true
  },
  files:{
    type:String,
    // required:true
  },
  lic:{
    type:String,
    // required:true
  },
  spritesheet:{
    type:String,
    // required:false
  },
  release:{
    type:Date,
    // required:true
  }
});
module.exports = mongoose.model('Asset', assetSchema);
