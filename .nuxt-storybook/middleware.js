const middleware = {}

middleware['auth-guard'] = require('../middleware/auth-guard.js')
middleware['auth-guard'] = middleware['auth-guard'].default || middleware['auth-guard']

middleware['auth-refresh'] = require('../middleware/auth-refresh.js')
middleware['auth-refresh'] = middleware['auth-refresh'].default || middleware['auth-refresh']

middleware['guest'] = require('../middleware/guest.js')
middleware['guest'] = middleware['guest'].default || middleware['guest']

export default middleware
