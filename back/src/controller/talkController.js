const Talk = require("../schemas/talkService");

module.exports = {
    async getTalkByToFrom (req, res){

        const {from, to} = req.params;

        console.log(from, to);
        // let term = await Term.findOne().sort({term_version: -1}).limit(1);
        // return res.json(term);
    },
}