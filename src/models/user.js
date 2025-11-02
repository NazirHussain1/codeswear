import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
   
  },
  password: {
    type: String,
    required: true,
    
  },
  phone: {
  type: String,
  trim: true,
  default: ''
},
  address: {
  type: String,
  trim: true,
  default: ''
}
}, {
  timestamps: true 
});


export default  mongoose.models.User || mongoose.model('User', userSchema);


