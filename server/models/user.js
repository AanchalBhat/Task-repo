const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String , default : null},
    email: { type: String, required: true , unique : true},
    password: { type: String, required: true },
    phone: { type: Number , default : null},
    mobile: { type: Number, required: true },
    zipcode: { type: Number, required: true },
    profilePic: { type: String , default :null },
    lat: { type : Number , default : null  },
    lang: { type : Number  , default : null }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
