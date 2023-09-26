const {response} = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req, res = response, next) => {
// como recibo el JWT ???? a traves del x-token en headers

const token= req.header('x-token');
// console.log(token)
if(!token){
    return res.status(401).json({
    ok: false,
    msg: 'No hay token en la petición'
    });
}
try {
    const {uid, name} = jwt.verify( // a traves del payload,verify lo cambio a decode

        token,
        process.env.SECRET_JWT_SEED
    );
    
    req.uid= uid;
    req.name=name;
    

} catch (error) {
    console.log(error)
    return res.status(401).json({
        ok: false,
        msg:'Token no válido'
    })
}
next();
}





module.exports= {
    validarJWT
}