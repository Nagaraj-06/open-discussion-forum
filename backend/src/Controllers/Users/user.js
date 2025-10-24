const db = require("../../config/db");

const userController = {
  getusers: async (req, res) => {
    try {
      db.query("select * from users", (err, result) => {
        if (err) return err;
        else {
          res.status(200).send(result);
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  TopicsCount: async (req, res) => {
    try {
      const email = req.query.email;
      const language_id = req.query.language_id;

      db.query(
        "select * from questions where email=? and language_id=?",
        [email, language_id],
        (err, result) => {
          if (err) return err;
          else {
            res.status(200).send(result);
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  getusernames: async (req, res) => {
    try {
      db.query("select username,email,id from users", (err, result) => {
        if (err) return err;
        else {
          res.status(200).send(result);
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  getProfile_info: async (req, res) => {
    try {
      const { email } = req.body;
      db.query("select * from users where email=?", [email], (err, result) => {
        if (err) console.log(err);
        else {
          res.send(result);
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  getProfile_infoId: async (req, res) => {
    try {
      const { userId } = req.query;
      db.query("select * from users where id=?", [userId], (err, result) => {
        if (err) console.log(err);
        else {
          res.send(result);
        }
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  userPosts: async (req, res) => {
    try {
      const email = req.body.email;
      db.query(
        "select * from questions where email =?",
        [email],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },
};

module.exports = { userController };
