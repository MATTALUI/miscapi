const jwt = require('jsonwebtoken');
///*
const dummyCookie = process.env.DUMMYCOOKIE;
//*/
module.exports = async function authenticateUser(req, res, next){
  const token = req.signedCookies.identity || req.headers['x-identity'];
  // res.cookie('identity', dummyCookie, { signed: true, httpOnly: true })
  // res.clearCookie('identity');
  try{
    const { id: userId } = jwt.verify(token, process.env.JWTSECRET);
    req.user = await Users.findOne({ id: userId });
    return next();
  }catch(err){
    res.clearCookie('identity');
    res.sendStatus(403);
  }
}
