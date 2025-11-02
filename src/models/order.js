import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Pending',
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
  },
  products: [
    {
      productId: {
        type: String,
        required: true
      },
      productName: {
        type: String,
        required: true
      },
      productPrice: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        required: true
      },
      size: {
        type: String,
        default: ''
      },
      variant: {
        type: String,
        default: ''
      }
    }
  ]
}, {
  timestamps: true 
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);