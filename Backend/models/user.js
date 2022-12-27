const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator=require("validator");


const userSchema = new mongoose.Schema({
	firstName: {
	  type: String,
	  required: [true, 'Please enter your name'],
	  maxLength: [50, 'Name cannot exceed 50 characters'],
	},
	lastName: {
	  type: String,
	  required: [true, 'Please enter your Lastname'],
	  maxLength: [50, 'Lastname cannot exceed 50 characters'],
	},
	email: {
	  type: String,
	  required: [true, 'Please enter your Email'],
	  validate: [validator.isEmail, 'Please enter a valid email'],
	},
	password: {
	  type: String,
	  required: [true, 'Please enter your password'],
	  select: false,
	},
	avatar: {
	  public_id: {
		type: String,
		required: true,
	  },
	  url: {
		type: String,
		required: true,
	  },
	},
	verified: { type: Boolean, default: false },
  });
  
  userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
	  next();
	}
	this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.getJWTToken = function () {
	return jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
	  expiresIn: '7d',
	});
  };
  
  //compare PAssword
  userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model("User",userSchema);