const ajv = require('ajv');

module.exports = schema => (req, res, next) => {
    const validator = new ajv({ allErrors: true });
    const fn_validate = validator.compile(schema);
    const is_valid = fn_validate(req.body);

    if (fn_validate.errors)
        fn_validate.errors.forEach(x => {
            if (x.keyword === 'minLength' && x.params.limit === 1) {
                x.message = x.dataPath.replace('.', '') + ' cannot be blank';
            }
        })

    if (!is_valid) {
        return res.status(400).json(fn_validate.errors);
    }

    next();
}