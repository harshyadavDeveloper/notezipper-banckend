const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
      
    },
    {
      timestamps: true,
    }
  );

  userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
  }

  userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email:this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn:'30d'
        }
      );
        
    } catch (error) {
        console.error("Error while generating token", error);
        // return null;
        
    }
}



  const User = mongoose.model('User', userSchema);

  module.exports = User;