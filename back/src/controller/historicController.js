const Historic = require("../schemas/historicService");

module.exports = {
    async getHistorics (req, res){
        let historics = await Historic.find();
        return res.json(historics);
    },

    async getHistoricsByUser (req, res){

        const {user_id} = req.params;

        let historics = await Historic.find({"user_id": user_id});
        return res.json(historics);
    }
}