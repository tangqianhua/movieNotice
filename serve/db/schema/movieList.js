const mongoose = require('mongoose')
const { Mixed, ObjectId } = mongoose.SchemaTypes
const movieSchema = new mongoose.Schema({
  doubanId: {
    type: String,
    unique: true,
  }, //  豆瓣id
  rate: {
    type: Number,
    default: 0
  },   //    评分
  title: {
    type:String,
    default: ''
  },  //  标题
  summary: {
    type:String,
    default:''
  },  //  简介
  video: {
    type: String
  },    //  视频
  poster: String,   //  封面
  cover: String,    //    视频图片

  categort: {
    type: ObjectId,
    ref: 'categoryModel'
  },
  videoKey: String,   //  上传到七牛的视频key
  posterKey: String,   // 上传到七牛的封面key
  coverKey: String,   // 上传到七牛的视频图片key

  rawTitle: String,
  moveiTypes: [String],
  pubdate: Mixed,
  year: Number,

  tags: [String],
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
// movieSchema.pre('save', function(next) {
//   if (this.isNew) {
//     this.meta.createdAt = this.meta.updatedAt = Date.now()
//   } else {
//     this.meta.updatedAt = Date.now()
//   }
// })

const movieModel = mongoose.model('movieModel', movieSchema)
console.log('movieModel')
module.exports = movieModel