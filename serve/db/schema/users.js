const mongoose = require('mongoose')
const Mixed = mongoose.SchemaTypes.Mixed

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})
// userSchema.pre('save', function(next) {
//   if (this.isNew) {
//     this.meta.createdAt = this.meta.updatedAt = Date.now()
//   } else {
//     this.meta.updatedAt = Date.now()
//   }
// })

const userModel = mongoose.model('userModel', userSchema)
console.log('userModel')
module.exports = userModel