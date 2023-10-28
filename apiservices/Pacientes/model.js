const mongoose = require('mongoose')

const pacientesSchema = mongoose.Schema({
      name:{
            type:String,
            required:true,
            minlength:3,
            maxlength:25
      },
      lastname:{
            type:String,
            required:true,
            minlength:3,
            maxlength:25
      },
      age:{
            type:Number,
            required:true
      },
      issue:{
            type:String
      },
      species:{
            type:String
      },
      raza:{
            type:String
      },
      nameowner:{type: mongoose.Schema.Types.ObjectId, 
                  ref: 'User' 
      }
})

module.exports = mongoose.model("Pacientes",pacientesSchema)