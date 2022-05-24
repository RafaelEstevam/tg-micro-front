const ObjectId = require('mongodb').ObjectId; 

const Talk = require("../schemas/talkService");
const User = require("../schemas/userService");

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