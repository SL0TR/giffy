const express = require('express');
const router = express.Router();

// any new resource api should imported here and then registered to
// router with proper api endpoint prefix (e.g /user user.route, /items items.route etc.)
const user = require('./user');
const auth = require('./auth');
const gif = require('./gif');
// do not remove the --route:import-- placeholder, if you use the cli to generate
// api resources, this works as place to require new routes.
/** --route:import-- */

router.use('/user', user.route);
router.use('/auth', auth.route);
router.use('/gif', gif.route);
// do not remove the --route-- placeholder, if you use the cli to generate
// api resources, this works as hook to attach new routes.
/** --route-- */

module.exports = router;
