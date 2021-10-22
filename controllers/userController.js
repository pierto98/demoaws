var User = require('../models/user');

// Display list of all Authors.
exports.user_list = function(req, res) {
    res.send('NOT IMPLEMENTED: User list');
};

// Display detail page for a specific Author.
exports.user_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: User detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.user_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User create GET');
};

// Handle Author create on POST.
exports.user_create_post = function(req, res) {
    log(req);
    res.write('NOT IMPLEMENTED: User create POST \n<br>');
    res.end(`req.url ${req.url} req.method ${req.method} req.params ${JSON.stringify(req.params)} req.body ${JSON.stringify(req.body)}, req.query ${JSON.stringify(req.query)}`);
};

// Display Author delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle Author delete on POST.
exports.user_delete_post = function(req, res) {
    log(req);
    res.write('NOT IMPLEMENTED: User delete POST \n<br>');
    res.end(`req.url ${req.url} req.method ${req.method} req.params ${JSON.stringify(req.params)} req.body ${JSON.stringify(req.body)}, req.query ${JSON.stringify(req.query)}`);
};

// Display Author update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET ' + req.params.id);
};

// Handle Author update on POST.
exports.user_update_post = function(req, res) {
    log(req);
    res.write('NOT IMPLEMENTED: User update POST \n<br>');
    res.end(`req.url ${req.url} req.method ${req.method} req.params ${JSON.stringify(req.params)} req.body ${JSON.stringify(req.body)}, req.query ${JSON.stringify(req.query)}`);
};


function log(req){
    console.log("date", new Date());
    console.log("req.url", req.url);
    console.log("req.method", req.method);
    console.log("req.params", req.params);
    console.log("req.body", req.body);
    console.log("req.query", req.query);    
}