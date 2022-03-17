const Term = require("../schemas/termService");

module.exports = {
    async getLastTerm (req, res){
        let term = await Term.findOne().sort({term_version: -1}).limit(1);
        return res.json(term);
    },

    async post (req, res){

        const {term_name, start_date} = req.body;

        let lastTermActivate = await Term.findOne().sort({term_version: -1}).limit(1);
        const newTermVersion = lastTermActivate?.term_version ? lastTermActivate?.term_version + 1 : 1;
        let term = await Term.create({term_version: newTermVersion, term_name, start_date});

        term.save();
        return res.json(term);
        
    }
}