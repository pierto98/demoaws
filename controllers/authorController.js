var fs = require("fs");
const body = require("./body-parser");
var Author = require('../models/author');
const HTML = true;

async function author_list_asincronica(res) {
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
        res.render("actors", { authors: l, title: "Lista de actores jade" });
    }
}

exports.author_post = async function(req, res, next) {
    const id = await Author.add(req.body.firstName, req.body.lastName);
    res.send(JSON.stringify(await Author.get(id)));
};

exports.author_put = async function(req, res, next){
    const rows = await Author.update(req.body.id, req.body.firstName, req.body.lastName);
    res.send(`${rows} registros actualizados`);
};

exports.author_delete = async function(req, res, next){
    const reg = await Author.get(req.body.id); 
    const rows = await Author.delete(req.body.id);
    if(rows>0) res.send(JSON.stringify(reg));
    else res.send(`${rows} registros eliminados`);
};

// Display list of all Authors.
exports.author_list = async function(req, res) {
    await author_list_asincronica(res);
};

// Display detail page for a specific Author.
exports.author_detail = async function(req, res) {
    const reg = await Author.get(req.params.id);
    res.send(JSON.stringify(reg));
};

// Display Author create form on GET.
exports.author_create_get = function(req, res) {
    //res.writeHead(200, {'Content-Type': 'text/HTML'});
    if (HTML) {
        res.send(fs.readFileSync("./views/actor_create.html", "utf8"));
    }
    else {
        res.render("actor_create", { title: "Crear actor jade" });
    }
};

// Handle Author create on POST.
exports.author_create_post = async function(req, res) {
    console.log("firstName", req.body.firstName);
    console.log("lastName", req.body.lastName);
    const id = await Author.add(req.body.firstName, req.body.lastName);
    console.log("actor created id", id);
    await author_list_asincronica(res);
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
        res.render("actor_delete", { author, title: "Eliminar actor jade" });
    }
};

// Handle Author delete on POST.
exports.author_delete_post = async function(req, res) {
    console.log("id", req.params.id);
    const rows = await Author.delete(req.params.id);
    console.log("rows", rows);
    await author_list_asincronica(res);
};

// Display Author update form on GET.
exports.author_update_get = async function(req, res) {
    console.log("id", req.params.id);
    const author = await Author.get(req.params.id);
    if (HTML) {
        res.send(fs.readFileSync("./views/actor_update.html", "utf8")
            .replace(/{{id}}/g, author.id)
            .replace("{{lastUpdate}}", author.lastUpdate)
            .replace("{{firstName}}", author.firstName)
            .replace("{{lastName}}", author.lastName));
    }
    else {
        res.render("actor_update", { author, title: "Actualizar actor jade" });
    }
};

// Handle Author update on POST.
exports.author_update_post = async function(req, res) {
    console.log("id", req.params.id);
    console.log("firstName", req.body.firstName);
    console.log("lastName", req.body.lastName);
    const rows = await Author.update(req.params.id, req.body.firstName, req.body.lastName);
    console.log("rows", rows);
    await author_list_asincronica(res);
};

exports.author_server = async function(req, res) {
    console.log("date", new Date());
    console.log("req.url", req.url);
    //console.log("req.headers", req.headers);
    console.log("req.method", req.method);
    console.log("req.query", req.query);
    console.log("req.params", req.params);
    console.log("req.body default", JSON.stringify(req.body));

    ///parse multipart/form-data text body request
    await body.parse(req);

    console.log("req.body parsed", JSON.stringify(req.body));
    console.log("req.cookies", req.cookies);
    res.clearCookies();
    res.write("NOT IMPLEMENTED /server POST method \n<br>");
    res.end(`req.params ${JSON.stringify(req.params)} req.body ${JSON.stringify(req.body)}`);
};
