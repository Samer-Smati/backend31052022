const { body, validationResult } = require('express-validator');





exports.Validation = async (req,res,next) =>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next()
    } catch (error) {
        return res.status(500).send({msg:error})
    }
}