var fs = require("fs");
var Author = require('../models/author');
const HTML = false;


async function author_list(res) {
    const l = await Author.list();
    console.log("actors list", l.length);
    if (HTML) {
        let text = "<div><div>ID</div><div>Name</div><div>Last Name</div><div>Last update</div><div>Editar</div><div>Eliminar</div></div>";
        for (let i of l)
            text += `<div><div>${i.id}</div><div>${i.firstName}</div><div>${i.lastName}</div><div>${i.lastUpdate}</div><div><a href="/author/${i.id}/update">Editar actor</a></div><div><a href="/author/${i.id}/delete">Eliminar actor</a></div></div>`;
        let page = fs.readFileSync("./views/actors.html", "utf8");
        res.send(page.replace("{{actorsList}}", text));
    }
    else {
        res.render("actors", { authors: l, title: "Lista de actores" });
    }
}

// Display list of all Authors.
exports.author_list = async function(req, res) {
    await author_list(res);
};

// Display detail page for a specific Author.
exports.author_detail = async function(req, res) {
    const a = await Author.get(req.params.id);
    res.send(JSON.stringify(a));
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    //res.writeHead(200, {'Content-Type': 'text/HTML'});
    if (HTML) {
        res.send(fs.readFileSync("./views/actor_create.html", "utf8"));
    }
    else {
        res.render("actor_create", { title: "Crear actor" });
    }
};

// Handle Author create on POST.
exports.author_create_post = async function(req, res) {
    console.log("firstName", req.body.firstName);
    console.log("lastName", req.body.lastName);
    const id = await Author.add(req.body.firstName, req.body.lastName);
    console.log("actor created id", id);
    await author_list(res);
};

// Display Author delete form on GET.
exports.author_delete_get = async function(req, res) {
    console.log("id", req.params.id);
    const author = await Author.get(req.params.id);
    if (HTML) {
        res.send(fs.readFileSync("./views/actor_delete.html", "utf8")
            .replace(/{{id}}/g, author.id)
            .replace("{{firstName}}", author.firstName)
            .replace("{{lastName}}", author.lastName)
            .replace("{{lastUpdate}}", author.lastUpdate));
    }
    else {
        res.render("actor_delete", { author, title: "Eliminar actor" });
    }
};

// Handle Author delete on POST.
exports.author_delete_post = async function(req, res) {
    console.log("id", req.params.id);
    const rows = await Author.delete(req.params.id);
    await author_list(res);
};

// Display Author update form on GET.
exports.author_update_get = async function(req, res) {
    console.log("id", req.params.id);
    const author = await Author.get(req.params.id);
    if (HTML) {
        res.send(fs.readFileSync("./views/actor_update.html", "utf8")
            .replace("{{id}}", author.id)
            .replace("{{firstName}}", author.firstName)
            .replace("{{lastName}}", author.lastName));
    }
    else {
        res.render("actor_update", { author, title: "Actualizar actor" });
    }
};

// Handle Author update on POST.
exports.author_update_post = async function(req, res) {
    console.log("id", req.params.id);
    console.log("firstName", req.body.firstName);
    console.log("lastName", req.body.lastName);
    const rows = await Author.update(req.params.id, req.body.firstName, req.body.lastName);
    await author_list(res);
};
