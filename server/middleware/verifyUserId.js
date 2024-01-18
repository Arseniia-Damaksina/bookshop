const verifyUserId = (req, res, next) => {
  const userId = req.cookies('id');
  // !!! req.param - kak v routere
  const currentUserId = req.params.id;
  if (userId === currentUserId) {
    next();
  } else {
    res.status(409).json({sucess: false, message: "User is not authorized"})
  }
}

export default verifyUserId;