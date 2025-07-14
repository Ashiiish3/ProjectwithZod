const validate = (validator) => async (req, res, next) => {
  try {
    const validateUser = await validator.parseAsync(req.body);
    req.body = validateUser;
    next();
  } catch (err) {
    res.json({message: err.issues[0].message})
  }
};

module.exports = validate;
