const Historic = require('../schemas/historicService');

const postHistoric = async (req, res, user) => {
    const {term_accept, term_accept_version, recieve_sms, recieve_email, show_sensitive_data} = req.body;
    const {_id} = user;

    const conditions_accept = [
        {recieve_sms},
        {recieve_email},
        {show_sensitive_data}
    ]

    const created_at = new Date();

    const historic = await Historic.create({user_id: _id, term_accept, term_accept_version, conditions_accept, created_at});
    historic.save();

}

module.exports = postHistoric;