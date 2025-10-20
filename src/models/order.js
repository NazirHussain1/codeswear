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
    default: 'Pending'
  },
  products: [
    {
      productId: {
       
       type: String
      },
      quantity: {
        type: String,
        default:1,
         required: true
      }
    }
  ]
}, {
  timestamps: true 
});


export default mongoose.models.Order || mongoose.model('Order', orderSchema);
