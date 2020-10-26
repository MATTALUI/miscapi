// We can use this object in order to map the auth header tokens to the "APP"
// that the user is trying to access
const AUTHSMAP = {
  'auto-logs': `Basic: ${process.env.AUTOLOGAUTH}`,
  'fastlang': `Basic: ${process.env.FASTLANGAUTH}`,
  'my-stocks': `Basic: ${process.env.STOCKSAUTH}`,
};

module.exports = async function authenticateApp(req, res, next){
  const app = req.path.split("/")[1];
  if(AUTHSMAP[app] === req.headers.authorization){
    next();
  }else{
    res.sendStatus(403);
  }
}
