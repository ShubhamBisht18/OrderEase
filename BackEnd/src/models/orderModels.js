import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    seatNumber: String,

    items: [
        {
            foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
            name: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: Number,

    paymentMethod:
    {
        type: String,
        enum: ['Online', 'Cash On Delivery'],
        required: true
    },
    
    isPaid:
    {
        type: Boolean,
        default: false
    },

    status:
    {
        type: String,
        enum: ['Pending', 'Ready', 'Received'],
        default: 'Pending'
    }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);