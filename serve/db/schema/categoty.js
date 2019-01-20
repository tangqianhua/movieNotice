const mongoose = require('mongoose')
const ObjectId = mongoose.SchemaTypes.ObjectId

const categorySchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String
  },
  movies: [{
    type: ObjectId,
    ref: 'movieModel'
  }],
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
categorySchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
})

const categoryModel = mongoose.model('categoryModel', categorySchema)

module.exports = categoryModel