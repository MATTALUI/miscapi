const jwt = require('jsonwebtoken');

module.exports = async function optionalUser(req, res, next){
  const token = req.signedCookies.identity || req.headers['x-identity'];
  // res.cookie('identity', process.env.DUMMYCOOKIE, { signed: true, httpOnly: true })
  // res.clearCookie('identity');
  try{
    const { id: userId } = jwt.verify(token, process.env.JWTSECRET);
    req.user = await Users.findOne({ id: userId });
  }catch(err){
    res.clearCookie('identity');
    req.user = null;
  }
  return next();
}
