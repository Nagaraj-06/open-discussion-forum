const db = require("../../config/db");

const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const PostsControllers = {
  getpost: async (req, res) => {
    try {
      const id = req.body.id;
      db.query("select * from questions where id=?", [id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
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

  getLanguageLevelDetails: async (req, res) => {
    const { language_id, level_id } = req.query;
    const sql = `
      SELECT 
        q.id AS post_id,
        q.title AS topic_name,

        -- 🟢 View count from view_details table
        COUNT(DISTINCT v.id) AS views_count,

        -- 🟢 Reply count from reply_details
        COUNT(DISTINCT r.id) AS replies_count,

        -- 🟢 Latest reply details
        r_latest.id AS last_reply_id,
        r_latest.from_email AS last_reply_email,
        u.id AS last_reply_user_id,
        u.username AS last_reply_username,
        r_latest.date AS last_reply_date,
        r_latest.time AS last_reply_time

      FROM questions q
      LEFT JOIN reply_details r ON r.post_id = q.id
      LEFT JOIN view_details v ON v.post_id = q.id

      -- 🟢 Subquery for latest reply per post
      LEFT JOIN (
        SELECT r1.*
        FROM reply_details r1
        INNER JOIN (
          SELECT post_id, MAX(CONCAT(date, ' ', time)) AS latest_datetime
          FROM reply_details
          GROUP BY post_id
        ) r2
        ON r1.post_id = r2.post_id
        AND CONCAT(r1.date, ' ', r1.time) = r2.latest_datetime
      ) r_latest ON r_latest.post_id = q.id

      -- 🟢 Join users for username & user_id
      LEFT JOIN users u ON u.email = r_latest.from_email

      WHERE q.language_id = ? AND q.level_id = ?

      GROUP BY 
        q.id,
        q.title,
        r_latest.id,
        r_latest.from_email,
        u.id,
        u.username,
        r_latest.date,
        r_latest.time

      ORDER BY q.id DESC;
    `;

    db.query(sql, [language_id, level_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(result);
    });
  },

  getRecentPosts: async (req, res) => {
    try {
      const sql = `
      SELECT 
        p.id, 
        p.title, 
        p.language_id, 
        p.level_id, 
        p.date AS last_post_date,
        p.time AS last_post_time,
        u.username,
        u.id AS user_id
      FROM questions p
      JOIN users u ON u.email = p.email
      ORDER BY p.date DESC, p.time DESC
      LIMIT 5;
    `;

      db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(result);
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  AddQuestion: async (req, res) => {
    try {
      const email = req.body.email;
      const language_id = req.body.language_id;
      const level_id = req.body.level_id;
      const title = req.body.title;
      const body = req.body.body;
      const date = req.body.date;
      const time = req.body.time;
      const image = req.file ? req.file.filename : null;

      let = sqlquery = "";
      let = queryParams = [];

      if (image) {
        sqlquery =
          "INSERT INTO questions (email,language_id,level_id,title,body,date,time,image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        queryParams = [
          email,
          language_id,
          level_id,
          title,
          body,
          date,
          time,
          image,
        ];
      } else {
        sqlquery =
          "INSERT INTO questions (email,language_id,level_id,title,body,date,time) VALUES (? ,? ,?, ?, ?, ?, ?)";
        queryParams = [email, language_id, level_id, title, body, date, time];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error inserting question");
        } else {
          res.send("Question added successfully");
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  EditDiscussion: async (req, res) => {
    try {
      const language_id = req.body.language_id;
      const level_id = req.body.level_id;
      const title = req.body.title;
      const body = req.body.body;
      const image = req.file ? req.file.filename : null;
      const edit_id = req.body.edit_id;
      let pre_image;
      if (req.body.pre_image) {
        pre_image = req.body.pre_image;
      }

      if (edit_id == null) {
        return res.json({ Status: "Failed becoz Edit ID is null" });
      }

      let = sqlquery = "";
      let = queryParams = [];

      if (image) {
        sqlquery =
          "update questions set language_id=?,level_id=?,title=?,body=?,image=? where id=?";
        queryParams = [language_id, level_id, title, body, image, edit_id];
      } else {
        if (pre_image != null) {
          sqlquery =
            "update questions set language_id=?,level_id=?,title=?,body=?,image=? where id=?";
          queryParams = [
            language_id,
            level_id,
            title,
            body,
            pre_image,
            edit_id,
          ];
        } else {
          sqlquery =
            "update questions set language_id=?,level_id=?,title=?,body=?,image=? where id=?";
          queryParams = [language_id, level_id, title, body, null, edit_id];
        }
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error inserting question");
        } else {
          db.query(
            "update reply_details set language_id=? ,level_id=? where post_id=?",
            [language_id, level_id, edit_id],
            (err, result) => {
              if (err) console.log(err);
              else {
                res.json({
                  Status: `${edit_id} th Question Edited successfully `,
                });
              }
            }
          );
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  Del_Post: async (req, res) => {
    try {
      const { id } = req.body;
      db.query("delete from questions where id=?", [id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
        }
      });

      db.query(
        "select id from view_details where view_id=?",
        [id],
        (err, resultt) => {
          if (err) return res.status(500).send(err);
          else {
            if (resultt.length > 0) {
              db.query(
                `delete from view_details where id in (${resultt
                  .map((item) => item.id)
                  .join(", ")} )`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    // console.log("Question deleted in view_details");
                  }
                }
              );
            }
          }
        }
      );

      db.query(
        "select id from reply_details where post_id=?",
        [id],
        (err, resultt) => {
          if (err) return res.status(500).send(err);
          else {
            if (resultt.length > 0) {
              db.query(
                `delete from reply_details where id in (${resultt
                  .map((item) => item.id)
                  .join(", ")} ) `,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    // console.log("Question deleted in reply_details");
                  }
                }
              );
            }
          }
        }
      );

      db.query(
        "select id from sub_replies where post_id=?",
        [id],
        (err, resultt) => {
          if (err) return res.status(500).send(err);
          else {
            if (resultt.length > 0) {
              db.query(
                `delete from sub_replies where id in (${resultt
                  .map((item) => item.id)
                  .join(", ")} )`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    // console.log("Question deleted in sub_replies");
                  }
                }
              );
            }
          }
        }
      );

      db.query("select id from likes where post_id=?", [id], (err, resultt) => {
        if (err) return res.status(500).send(err);
        else {
          if (resultt.length > 0) {
            db.query(
              `delete from likes where id in (${resultt
                .map((item) => item.id)
                .join(", ")} )`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).send(err);
                } else {
                  // console.log("Question deleted in likes");
                }
              }
            );
          }
        }
      });

      db.query(
        "select id from reply_likes where post_id=?",
        [id],
        (err, resultt) => {
          if (err) return res.status(500).send(err);
          else {
            if (resultt.length > 0) {
              db.query(
                `delete from reply_likes where id in (${resultt
                  .map((item) => item.id)
                  .join(", ")} ) `,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    // console.log("Question deleted in reply_likes");
                  }
                }
              );
            }
          }
        }
      );

      db.query("select id from saved where post_id=?", [id], (err, resultt) => {
        if (err) return res.status(500).send(err);
        else {
          if (resultt.length > 0) {
            db.query(
              `delete from saved where id in (${resultt
                .map((item) => item.id)
                .join(", ")} )`,
              (err, result) => {
                if (err) {
                  console.log(err);
                  res.status(500).send(err);
                } else {
                  // console.log("Question deleted in saved");
                }
              }
            );
          }
        }
      });

      db.query(
        "select id from reply_saved where post_id=?",
        [id],
        (err, resultt) => {
          if (err) return res.status(500).send(err);
          else {
            if (resultt.length > 0) {
              db.query(
                `delete from reply_saved where id in (${resultt
                  .map((item) => item.id)
                  .join(", ")} )`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    // console.log("Question deleted in reply_saved");
                  }
                }
              );
            }
          }
        }
      );

      res.send({ Status: "Post Deleted SuccessFully.." });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  getposts: async (req, res) => {
    try {
      const { language_id } = req.body;
      db.query(
        "select * from questions where language_id=?",
        [language_id],
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
        error: error.message,
      });
    }
  },

  getallposts: async (req, res) => {
    try {
      db.query("select * from questions", (err, result) => {
        if (err) {
          console.log(err);
        } else {
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

  Getpost_programLevel: async (req, res) => {
    const { language_id, level_id } = req.body;

    db.query(
      "SELECT * FROM questions WHERE language_id = ? AND level_id = ?",
      [language_id, level_id],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.send(result);
        }
      }
    );
  },
};

module.exports = { PostsControllers };
