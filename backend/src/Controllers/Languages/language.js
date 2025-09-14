
const db=require('../../config/db');


const languageController = {

    getLanguages: async (req, res) => {
        try{
            db.query("select * from languages",
            (err,result)=>{
                if(err) return err;
                else{
                    res.status(200).send(result)
                }
            }
            )
        }
        catch(error) {
            console.log("Error Occurs...");
            res.status(500).send({
                    error   : error.message
                })
        }
    },

    getLanguage: async (req, res) => {
        const language_id = req.query.language_id;
        try {
            db.query(
                "select label,name from languages where id=?",
                [language_id],
                (err, result) => {
                    if(err) {
                        return res.status(500).json({
                            message: "Database error",
                            error: err.message
                        });
                    }
                    res.status(200).json(result);
                }
            );
        } 
        catch(error) {
            console.log("Error Occurs...");
            res.status(500).send({
                    error   : error.message
                })
        }
    },


    
}


module.exports = { languageController };