const db = require("../../config/db");

const userController = {
  profileFullData: async (req, res) => {
    try {
      const { userId } = req.body;

      // 1️⃣ Get user info
      const [user] = await db
        .promise()
        .query("SELECT * FROM users WHERE id = ?", [userId]);

      if (!user.length) {
        return res.status(404).send({ message: "User not found" });
      }

      const email = user[0].email;

      // 2️⃣ Fetch everything in parallel using Promise.all()
      const [
        saved,
        replySaved,
        favourites,
        replyFavourites,
        userPosts,
        userReplies,
        languages,
      ] = await Promise.all([
        // saved posts
        db.promise().query(
          `SELECT q.* FROM saved s 
         JOIN questions q ON q.id = s.post_id
         WHERE s.email = ? AND s.status = '1'`,
          [email]
        ),

        // reply saved
        db.promise().query(
          `SELECT rd.* FROM reply_saved rs
         LEFT JOIN reply_details rd ON rs.MainReplyId = rd.id
         LEFT JOIN sub_replies sr ON rs.SubReplyId = sr.id
         WHERE rs.email = ? AND rs.status = '1'`,
          [email]
        ),

        // favourites (likes)
        db.promise().query(
          `SELECT q.* FROM likes l
         JOIN questions q ON q.id = l.post_id
         WHERE l.email = ? AND l.status = '1'`,
          [email]
        ),

        // reply favourites
        db.promise().query(
          `SELECT rd.* FROM reply_likes rl
         LEFT JOIN reply_details rd ON rl.MainReplyId = rd.id
         LEFT JOIN sub_replies sr ON rl.SubReplyId = sr.id
         WHERE rl.email = ? AND rl.status = '1'`,
          [email]
        ),

        // user posts
        db.promise().query("SELECT * FROM questions WHERE email = ?", [email]),

        // user replies
        db
          .promise()
          .query("SELECT * FROM reply_details WHERE from_email = ?", [email]),

        // languages
        db.promise().query("SELECT * FROM languages"),
      ]);

      // 3️⃣ Send everything at once
      res.send({
        user: user[0],
        saved: saved[0],
        replySaved: replySaved[0],
        favourites: favourites[0],
        replyFavourites: replyFavourites[0],
        userPosts: userPosts[0],
        userReplies: userReplies[0],
        languages: languages[0],
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  getFullProfileInfo: async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    try {
      // Wrap callback-based query in Promise
      const profile = await new Promise((resolve, reject) => {
        db.query(
          `
        SELECT 
          u.id, u.username, u.email, u.dept, u.roll_number, u.batch,
          COALESCE(q_count.total_questions, 0) AS total_questions,
          COALESCE(r_count.total_replies, 0) AS total_replies
        FROM users u
        LEFT JOIN (
          SELECT email, COUNT(*) AS total_questions FROM questions GROUP BY email
        ) q_count ON q_count.email = u.email
        LEFT JOIN (
          SELECT from_email, COUNT(*) AS total_replies FROM reply_details GROUP BY from_email
        ) r_count ON r_count.from_email = u.email
        WHERE u.id = ?
        `,
          [userId],
          (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
          }
        );
      });

      // Fetch user's posts
      const posts = await new Promise((resolve, reject) => {
        db.query(
          `
        SELECT 
          q.id, q.title, q.language_id, q.level_id, q.date, q.time,
          COUNT(v.id) AS views
        FROM questions q
        LEFT JOIN view_details v ON q.id = v.post_id
        WHERE q.email = ?
        GROUP BY q.id, q.title, q.language_id, q.level_id, q.date, q.time
        ORDER BY q.date DESC, q.time DESC
        `,
          [profile.email],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      // Fetch user's replies
      const replies = await new Promise((resolve, reject) => {
        db.query(
          `
        SELECT r.*, q.title, q.language_id, q.level_id
        FROM reply_details r
        JOIN questions q ON r.post_id = q.id
        WHERE r.from_email = ?
        ORDER BY r.date DESC, r.time DESC
        `,
          [profile.email],
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });

      res.json({ profile, posts, replies });
    } catch (err) {
      console.error("Profile query failed:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getusers: async (req, res) => {
    try {
      db.query("SELECT COUNT(id) AS total_users FROM users", (err, result) => {
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
      db.query(
        "select username,id from users where email=?",
        [email],
        (err, result) => {
          if (err) console.log(err);
          else {
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
