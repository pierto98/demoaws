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
    res.send('NOT IMPLEMENTED: User create POST');
};

// Display Author delete form on GET.
exports.user_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete GET');
};

// Handle Author delete on POST.
exports.user_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User delete POST');
};

// Display Author update form on GET.
exports.user_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: User update GET ' + req.params.id);
};

// Handle Author update on POST.
exports.user_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: User update POST');
};