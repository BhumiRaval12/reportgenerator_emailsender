const express = require('express');
const router = express.Router();
const courseController = require('./controllers/courseController');

let bodyparser = require('body-parser');

// Configuring body parser
router.use(
     bodyparser.urlencoded({
          extended: false,
     })
);


router.get('/', courseController.index);
router.get('/add', courseController.add);

router.get('/edit/:id', courseController.edit);
module.exports = router;



router.post('/insert', courseController.insert);