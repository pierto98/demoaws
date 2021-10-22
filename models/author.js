var mysql = require("../models/mysql");

function authorFields(id, firstName, lastName, lastUpdate) {
    return { id, firstName, lastName, lastUpdate };
}

function record(row) {
    return authorFields(row.actor_id, row.first_name, row.last_name, row.last_update);
}


async function authorGet(id) {
    let conn = null;
    try {
        conn = mysql.connection();
        conn.connect();

        return await new Promise((resolve, reject) => {
                conn.query("select * from actor where actor_id=?", id,
                    function(err, rows, fields) {
                        if (err) throw err;
                        if (rows.length > 0)
                            resolve(record(rows[0]));
                    });
            }).then(function(objeto){
                return objeto;
            })
            .catch((err) => console.log("author async authorGet connection query promise catch err", err));
    }
    catch (err) {
        console.log("author async authorGet err", err);
    }
    finally {
        if (conn)
            conn.end();
    }
}

async function authorList() {
    let conn = null;
    try {
        conn = mysql.connection();
        conn.connect();

        return await new Promise((resolve, reject) => {
                conn.query("select * from actor",
                    function(err, rows, fields) {
                        if (err) throw err;
                        let l = [];
                        for (let r of rows) {
                            l.push(record(r));
                        }
                        resolve(l);
                    });
            }).then(function(arreglo){
                return arreglo;
            })
            .catch((err) => console.log("author async authorList connection query promise catch err", err));
    }
    catch (err) {
        console.log("author async authorList err", err);
    }
    finally {
        if (conn)
            conn.end();
    }
}

async function authorAdd(firstName, lastName) {
    let conn = null;
    try {
        conn = mysql.connection();
        conn.connect();

        return await new Promise((resolve, reject) => {
                conn.query("insert into actor(first_name, last_name) values(?, ?)", [firstName, lastName],
                    function(err, result, fields) {
                        if (err) throw err;
                        resolve(result);
                    });
            }).then((r) => r.insertId)
            .catch((err) => console.log("author async authorAdd connection query promise catch err", err));
    }
    catch (err) {
        console.log("author async authorAdd err", err);
    }
    finally {
        if (conn)
            conn.end();
    }
}

async function authorUpdate(id, firstName, lastName) {
    let conn = null;
    try {
        conn = mysql.connection();
        conn.connect();

        return await new Promise((resolve, reject) => {
                conn.query("update actor set first_name=?, last_name=? where actor_id=?", [firstName, lastName, id],
                    function(err, result, fields) {
                        if (err) throw err;
                        resolve(result);
                    });
            })
            .then((r) => r.affectedRows)
            .catch((err) => console.log("author async authorUpdate connection query promise catch err", err));
    }
    catch (err) {
        console.log("author async authorUpdate err", err);
    }
    finally {
        if (conn)
            conn.end();
    }
}


async function authorDelete(id) {
    let conn = null;
    try {
        conn = mysql.connection();
        conn.connect();

        return await new Promise((resolve, reject) => {
                conn.query("delete from actor where actor_id=?", id,
                    function(err, result, fields) {
                        if (err) throw err;
                        resolve(result);
                    });
            })
            .then((r) => r.affectedRows)
            .catch((err) => console.log("author async authorDelete connection query promise catch err", err));
    }
    catch (err) {
        console.log("author async authorDelete err", err);
    }
    finally {
        if (conn)
            conn.end();
    }
}

exports.get = authorGet;
exports.list = authorList;
exports.add = authorAdd;
exports.update = authorUpdate;
exports.delete = authorDelete;
