const {con} = require("../config.js");

module.exports = {
    async test(req, res) {
        const result = await con.query("SELECT * FROM activation", function (err, result, fields) {
            if (err) throw err;
            return res.json(result);
        });
    }
}