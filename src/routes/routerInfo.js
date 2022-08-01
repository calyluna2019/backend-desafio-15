const { Router } = require('express');
const { info } = require('../controllers/info');
const compression = require('compression');
const router = Router();

router.get('/info', compression({
    level:5
}), info)

module.exports = router;