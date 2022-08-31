
const { validationResult } = require('express-validator');
const validarCampos = (req, res, nex)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    nex();
}

module.exports = {
    validarCampos
}