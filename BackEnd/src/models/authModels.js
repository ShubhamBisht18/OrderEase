import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        mobile:
        {
            type: String,
            required: true
        },
        password:
        {
            type: String,
            required: true,
            select: false
        },
        role:
        {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    }, { timestamps: true })

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next()
//     }
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
//     next()
// })

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10)
    .then(salt => bcrypt.hash(this.password, salt))
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(next)
});


export default mongoose.model('User', userSchema)