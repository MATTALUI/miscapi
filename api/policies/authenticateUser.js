const jwt = require('jsonwebtoken');

module.exports = async function authenticateUser(req, res, next){
  const token = req.signedCookies.identity || req.headers['x-identity'];
  // res.cookie('identity', process.env.DUMMYCOOKIE, { signed: true, httpOnly: true })
  // res.clearCookie('identity');
  console.log(token)
  try{
    const { id: userId } = jwt.verify(token, process.env.JWTSECRET);
    req.user = await Users.findOne({ id: userId });
    console.log('user header fine')
    return next();
  }catch(err){
    res.clearCookie('identity');
    res.sendStatus(403);
  }
}
