import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
   
  },
  desc: {
    type: String,
    required: true
  },
  img: {
    type: String, // URL or path to the image
    required: true
  },
  category: {
    type: String,
    required: true
  },
  size: {
    type: [String], // e.g., ['S', 'M', 'L', 'XL']
    default: []
  },
  color: {
    type: [String], // e.g., ['Red', 'Blue']
    default: []
  },
  price: {
    type: Number,
    required: true
  },
  availableQty: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // adds createdAt and updatedAt
});


export default mongoose.models.Product || mongoose.model('Product', productSchema);


