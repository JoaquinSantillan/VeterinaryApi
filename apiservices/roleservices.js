

const ROLES ={
      ADMIN:"admin",
      USER:"user"
}

const PERMISOS={
      READ: "read",
      CREATE: "create",
      UPDATE: "update",
      DELETE: "delete"
}

const hasPermisos = (userRole,requiredPermisos)=>{
      switch (userRole) {
            case ROLES.ADMIN:
                  return true
            case ROLES.USER:
                  switch (requiredPermisos){
                        case PERMISOS.READ:
                              return true
                              default:
                                    return false
                  }
      
            default:
                  return false
      }
}


const requirePermisos = (requiredPermisos)=>{
      return (req,res,next)=>{
            if (hasPermisos(req.user.role,requiredPermisos)) {
                  next()
            }else{
                  res.status(403).json({message:"Forbiden"})
            }
      }
}


module.exports = {
      ROLES,
      PERMISOS,
      hasPermisos,
      requirePermisos
}