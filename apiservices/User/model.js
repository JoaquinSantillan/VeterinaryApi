const mongoose = require("mongoose")
const {ROLES} = require("../roleservices")
const { Schema } = mongoose;

const UserSchema = mongoose.Schema({
      name: {
            type: String,
            required: true
      },
      email: {
            type: String,
            required: true,
            unique: true
      },
      password: {
            type: String,
            required: true
      },
      tokens: [{
            token: {
            type: String,
            required: true
            }
      }],
      role: {
            type: String,
            enum: [ROLES.ADMIN, ROLES.USER],
            default: ROLES.USER
      },
      pacientes:[{ type: Schema.Types.ObjectId, ref: 'Pacientes' }]
})

const User = mongoose.model('User',UserSchema)

module.exports = User