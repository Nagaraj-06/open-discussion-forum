const db = require("../../config/db");

const LevelController = {
  getRecentPostsByLanguage: async (req, res) => {
    const { language_id } = req.query;
    const sql = `
    SELECT 
      q.*, 
      u.username as username,
      u.id as user_id
    FROM questions q
    LEFT JOIN users u ON q.email = u.email
    WHERE q.language_id = ?
    ORDER BY CONCAT(q.date, ' ', q.time) DESC
    LIMIT 5;
  `;
    db.query(sql, [language_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(result);
    });
  },

  getLevelStatsForLanguage: async (req, res) => {
    const { language_id } = req.query;
    if (!language_id)
      return res.status(400).json({ error: "language_id required" });

    const sql = `
      SELECT 
        l.id AS level_id,
        l.name AS level_name,
        l.language_id,
        lang.label as language_label,
        lang.name as language_name,
        COUNT(DISTINCT q.id) AS posts,
        COUNT(DISTINCT r.id) AS replies,
        q_latest.email AS last_post_email,
        u.id AS last_post_user_id,
        u.username AS last_post_username,
        q_latest.date AS last_post_date,
        q_latest.time AS last_post_time,
        q_latest.id AS last_post_id
      FROM levels l
      LEFT JOIN languages lang ON lang.id = l.language_id
      LEFT JOIN questions q ON q.level_id = l.id
      LEFT JOIN reply_details r ON r.level_id = l.id
      LEFT JOIN (
        SELECT q1.*
        FROM questions q1
        INNER JOIN (
          SELECT level_id, MAX(CONCAT(date, ' ', time)) AS latest_datetime
          FROM questions
          GROUP BY level_id
        ) q2
        ON q1.level_id = q2.level_id
        AND CONCAT(q1.date, ' ', q1.time) = q2.latest_datetime
      ) q_latest ON q_latest.level_id = l.id
      LEFT JOIN users u ON u.email = q_latest.email
      WHERE l.language_id = ?
      GROUP BY 
        l.id,
        l.name,
        l.language_id,
        lang.label,
        lang.name,
        q_latest.id,
        q_latest.email,
        u.id,
        u.username,
        q_latest.date,
        q_latest.time
      ORDER BY l.id ASC;
    `;

    db.query(sql, [language_id, language_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(result);
    });
  },

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
