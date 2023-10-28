const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./model');
require('dotenv').config()



const router = express.Router();

router.use((req, res, next) => {
      console.log(`Received ${req.method} request to ${req.path} with body: `, req.body);
      next();
    });

    
router.post('/register',async(req,res)=>{

        
      const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,

      })

      try {
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password,salt)

            const savedUser = await user.save()

            res.status(200).json({
                  success:"usuario creado correctamente",
                  savedUser
            })
      } catch (error) {
            res.status(400).send(error)
      }
})

router.post('/login',async(req,res)=>{
      const email = req.body.email
      const password = req.body.password

      const user = await User.findOne({email})

      if(!user)return res.status(400).json({errorMessage:"email or password not valid"})

      const isMatch = await bcrypt.compare(password,user.password)

      if(!isMatch) return res.status(400).json({notFoundMessage:"email or password incorrect"})

      const token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET)
      
      res.cookie('auth-token', token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict', // solo se enviará la cookie en solicitudes del mismo sitio
            path: '/' // tiempo de expiración en milisegundos (1 día)
      });


      user.tokens = user.tokens.concat({token})
      await user.save()

      res.json({token:token,user:user})
      
})




    router.post("/logout",(req,res)=>{
      const token = req.headers.authorization?.split(' ')[1]

      if(!token) return res.status(401).json({messageError:"token not found"})

      try {
            return res.status(200).json({exitSuccessfully:"logout exit"})
      } catch (error) {
            console.log(error)
            return res.status(400).json({errorSession:"error exit session"})
      }
    })


module.exports = router;