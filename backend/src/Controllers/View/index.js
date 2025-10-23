const db = require("../../config/db");

const ViewsController = {
  postViewData: async (req, res) => {
    try {
      const { email, post_id } = req.body;

      db.query(
        "select * from view_details where email=? and post_id=?",
        [email, post_id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.length === 0) {
              db.query(
                "insert into view_details(email,post_id) values (?,?)",
                [email, post_id],
                (err, resultt) => {
                  if (err) {
                    return console.log(err);
                  } else {
                    return res.json({ Status: "Success" });
                  }
                }
              );
            } else {
              return res.json({ Status: "Failed" });
            }
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  GetViews_posts: async (req, res) => {
    try {
      db.query("select post_id from view_details", (err, result) => {
        if (err) {
          return res.send(err);
        }
        res.send(result);
      });
    } catch (error) {
      return res.send(error);
    }
  },
};

module.exports = { ViewsController };
