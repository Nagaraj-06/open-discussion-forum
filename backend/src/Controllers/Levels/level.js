const db = require("../../config/db");

const LevelController = {
  getLevelForLanguage: async (req, res) => {
    const lang_id = req.query.lang_id;

    try {
      db.query(
        `select * from levels where language_id=?`,
        [lang_id],
        (err, result) => {
          if (err) return err;
          else {
            res.status(200).send(result);
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

  getLevels: async (req, res) => {
    try {
      db.query(`select * from levels`, (err, result) => {
        if (err) return err;
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

  getLevel: async (req, res) => {
    const level_id = req.query.level_id;
    try {
      db.query(
        "select name,label from levels where id=?",
        [level_id],
        (err, result) => {
          if (err) {
            return res.status(500).json({
              message: "Database error",
              error: err.message,
            });
          }
          res.status(200).json(result);
        }
      );
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },
};

module.exports = { LevelController };
