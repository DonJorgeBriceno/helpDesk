const Incidente = require('../../Cloud/model/Incidentes')
const Usuario = require("../model/Usuarios")
//Mostrar
module.exports.mostrar = (req, res)=>{
    const criterio = req.params.id
    console.log(criterio)
    Incidente.find({solucionado:criterio}, (error, inc)=>{       
  
        if(error) {
            return res.status(500).json({
                message: 'Error mostrando los inc'
            })
        }

        return res.render('verIncidentes', {inc: inc}) 
    
       
    })
}

//Solucionar
module.exports.solucionar = (req, res)=>{
    const cod = req.params.id
    console.log("El id es: " +cod)
    Incidente.findById(cod, (error, inc)=>{
        if(error){
            return res.status(500).json({
                message: 'Error eliminando el inc'
            })
        }
        return res.render('solucionarInc',  {inc: inc})
       
    })
   
    }

//Crear
module.exports.crear = (req, res)=>{
    //console.log(req.body)
    const inc = new Incidente({
    cod: req.body.codigo,
    p:req.body.prioridad,
    asunto: req.body.asunto,
    descripcion: req.body.desc,
    asignado_a: req.body.res
    })
    inc.save(function(error,inc){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el inc'
            })
        }
        res.redirect('/')    
    })
}



//Cambiar estado 
module.exports.cambioEstado = (req, res)=>{
    const ident = req.params.id
    const resolucion = req.params.nt
  
    //console.log("El id es: " + ident)
    Incidente.findById(ident, (error, inc)=>{
        if(error){
            return res.status(500).json({
                message: 'Error eliminando el inc'
            })
        }
        const solucionado= true
        //console.log("Mostrando Estado actual: "+ inc.solucionado)
        Incidente.findByIdAndUpdate(ident, {solucionado, resolucion}, (error, inc)=>{
            if(error){
                return res.status(500).json({
                    message: 'Error actualizando el incidente'
                         })
            }
        })



        res.redirect('/')
       
    })
}


//Borrar
module.exports.borrar = (req, res)=>{
    const cod = req.params.id
    Incidente.findByIdAndRemove(cod, (error, inc)=>{
       
        if(error){
            return res.status(500).json({
                message: 'Error eliminando el inc'
            })
        }
        res.redirect('/')
    })
}

//LogIn

module.exports.registro = (req, res)=>{
    const usernameR = req.body.usernameR;
    const passwordR = req.body.passwordR;
    const user = new Usuario({
    username: usernameR,
    password: passwordR
    })
    user.save(function(error,user){
        if(error){
            return res.status(500).json({
                message: 'Error al crear el user'
            })
        } else{
            console.log("Usuario creado con éxito")
        }
        res.redirect('/')    
    })
}


module.exports.iniciar = (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

    Usuario.findOne({username}, (err, user)=>{
    if(err){
        console.log("Error al autenticar el usuario TI")
        res.redirect('/')
    } else if(!user){
        console.log("No existe el usuario TI")
        res.redirect('/')
    } else{
        user.isCorrectPassword(password, (err, result)=>{
            if(err){
                console.log("Error al autenticar el usuario TI")
            } else if(result){
                console.log("Usuario autenticado exitosamente")
                return res.render('index')
            } else{
                console.log("Usuario o Contraseña errónea")
                res.redirect('/')
            }
        })
    }    
    })
}

module.exports.volver = (req, res)=>{
     return res.render('index')
 
}


