function propsUsers(req, res, next) {
  const { name, photo, email } = req.body;
  if (!name || !photo || !email) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} Complete all the fields (name, photo and email)`,
    });
  } else if (!/@/.test(email) || email.length < 4) {
    return res.json({
      statusCode: 400,
      message: `${req.method} ${req.url} provide a valid email address`
    })
  } else {
    return next();
  }
}

export default propsUsers;
