const { string, required, object, boolean } = require("joi");
const mongoose = require("mongoose");

//User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    trim: true,
    minlength: 5,
    maxlength: 100,
    unique: true,
    validate: {
    validator: function(v) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
    },
    message: props => `${props.value} is not a valid email address!`
  }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profilePhoto: {
    //type: Object,
      type: {
        url: String,
        publicId: String
    },
    default:{
        url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        publicId: null
    }
  },
  bio: {
    type: String,
  },

  isAdmin: {
    type: Boolean,
    default: false
  },
    isAccountVerified: {
    type: Boolean,
    default: false
  },
}, {
    timestamps: true
});

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

module.exports = mongoose.model('User', userSchema);
