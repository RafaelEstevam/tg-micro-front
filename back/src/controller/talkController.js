const Talk = require("../schemas/talkService");



module.exports = {
    async getTalkByToFrom (req, res){
        
        const {from, to} = req.params;

        const query = {
            "$or": [
                {
                    "$and": [
                        {
                            "from_id": {
                                "$eq": from
                            }
                        },
                        {
                            "to_id": {
                                "$eq": to
                            }
                        }
                    ]
                },
                {
                    "$and": [
                        {
                            "from_id": {
                            "$eq": to
                            }
                        },
                        {
                            "to_id": {
                                "$eq": from
                            }
                        }
                    ]
                }
            ]
        }

        let talks = await Talk.find(query);

        // let filteredTalks = talks.filter((item) => {
        //     return item.to_id === to && item.from_id === from || item.to_id === from && item.from_id === to
        // });

        // return res.json(filteredTalks);
        return res.json(talks);
    },

    async getTalkByStudentEmail (req, res){
        const {email} = req.body;

        const query = {
            email
        }

        let talks = await Talk.find(query).count();

        return res.json({numberTalks: talks});
    }
}