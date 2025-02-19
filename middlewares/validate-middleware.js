const validate = (schema) => async(req, res, next) =>{
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        const errMsg = err.errors[0].message;
        console.error(errMsg);
        res.status(400).json({ 
           msg: errMsg
        });
    }

}

module.exports = validate;