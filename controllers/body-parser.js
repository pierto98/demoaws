/**
 * Parses multipart/form-data text request from body as JSON req.body properties
 */
exports.parse = async function(req) {
    if (req && JSON.stringify(req.body || {}) == "{}") {
        let data = "";
        req.on("data", _data => data += _data);
        await new Promise((resolve, reject) =>
            req.on("end", () => resolve()));
        //console.log("data after req.data and req.end", data);
        const boundary = data.substring(0, data.indexOf('\r\n'));
        //console.log("boundary", boundary);
        data = data.split(boundary);
        //console.log("data boundary split", data);
        for (const _d of data) {
            if (!_d) continue;
            //console.log("data element text", _d);
            if (_d.search(/;\s+name="([^"]+)"[\r\n]+(.*)\r\n/g)) {
                //console.log("data element match", "key", RegExp.$1, "value", RegExp.$2);
                req.body[RegExp.$1] = RegExp.$2;
            }
        }
        //console.log("req.body parsed", JSON.stringify(req.body));
    }
    return req.body;
};
