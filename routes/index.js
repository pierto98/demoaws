var express = require('express');
var router = express.Router();
var author_controller = require('../controllers/authorController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express 1.6 jade', date: new Date() });
});

router.post("/author/post", author_controller.author_post);

/// AUTHOR ROUTES ///
// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', author_controller.author_create_get);

// POST request for creating Author.
router.post('/author/create', author_controller.author_create_post);

// GET request to delete Author.
router.get('/author/:id/delete', author_controller.author_delete_get);

// POST request to delete Author.
router.post('/author/:id/delete', author_controller.author_delete_post);

// GET request to update Author.
router.get('/author/:id/update', author_controller.author_update_get);

// POST request to update Author.
router.post('/author/:id/update', author_controller.author_update_post);

// GET request for one Author.
router.get('/author/:id', author_controller.author_detail);

// GET request for list of all Authors.
router.get('/authors', author_controller.author_list);

router.post("/server", author_controller.author_server);

module.exports = router;
