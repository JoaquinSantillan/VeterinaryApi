const router = require('express').Router()
const auth = require('../../middlewares/auth')
const Pacientes = require('../Pacientes/model')
const { requirePermisos, PERMISOS } = require('../roleservices')


router.post('/pacientes',auth,async(req,res)=>{
      const newNote = new Pacientes({
            ...req.body,
            nameowner: req.user._id
      });
            await newNote.save();
            res.send(newNote);
})


router.use((req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '')
  next()
})



router.get('/pacientes',auth,async(req,res)=>{
  try {
    const pacientes = await Pacientes.find({nameowner:req.user._id})
    res.status(200).json({
      success:"encontrado todos los pacientes ",
      pacientes
    })
  } catch (error) {
    res.status(500).send(error)
  }
})


router.get('/pacientesadmin',auth,requirePermisos(PERMISOS.READ),async(req,res)=>{
  try{
    const users = await Pacientes.find().populate("nameowner")
    res.json(users);
  }catch(error){
    res.status(500).json({message:error.message})
  }
})

module.exports = router