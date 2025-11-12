const db = require("../../config/db");

const languageController = {

  getForumStats: async (req, res) => {
    try {
      const query = `
      SELECT 
        (SELECT COUNT(*) FROM languages) AS languages_count,
        (SELECT COUNT(*) FROM levels) AS levels_count,
        (SELECT COUNT(*) FROM questions) AS posts_count;
    `;

      db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result[0]);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getLanguageStats: async (req, res) => {
    try {
      const query = `
      SELECT 
        l.id AS language_id,
        l.name AS skill_name,
        l.url AS language_url,

        -- Counts
        COUNT(DISTINCT lv.id) AS levels_count,
        COUNT(DISTINCT q.id) AS posts_count,

        -- Last post info
        q_latest.id AS last_post_id,
        q_latest.email AS last_post_email,
        u.username AS last_post_username,
        u.id AS last_post_userId,   -- ✅ Added user ID
        q_latest.level_id AS last_post_level_id,
        q_latest.date AS last_post_date,
        q_latest.time AS last_post_time

      FROM languages l
      LEFT JOIN levels lv ON lv.language_id = l.id
      LEFT JOIN questions q ON q.language_id = l.id

      -- ✅ Latest post per language
      LEFT JOIN (
        SELECT q1.*
        FROM questions q1
        INNER JOIN (
          SELECT language_id, MAX(CONCAT(date, ' ', time)) AS latest_datetime
          FROM questions
          GROUP BY language_id
        ) q2
        ON q1.language_id = q2.language_id
        AND CONCAT(q1.date, ' ', q1.time) = q2.latest_datetime
      ) q_latest ON q_latest.language_id = l.id

      -- ✅ Join with users table by email
      LEFT JOIN users u ON u.email = q_latest.email

      GROUP BY 
        l.id, 
        l.name, 
        l.url,
        q_latest.id,
        q_latest.email,
        u.username,
        u.id,                  -- ✅ include in group by
        q_latest.level_id,
        q_latest.date,
        q_latest.time
      ORDER BY l.id ASC;
    `;

      db.query(query, (err, result) => {
        if (err) return res.status(500).send({ error: err.message });
        res.status(200).send(result);
      });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  },

  getLanguages: async (req, res) => {
    try {
      db.query("select * from languages", (err, result) => {
        if (err) return err;
        else {
          res.status(200).send(result);
        }
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  getLanguage: async (req, res) => {
    const language_id = req.query.language_id;
    try {
      db.query(
        "select label,name from languages where id=?",
        [language_id],
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

module.exports = { languageController };
