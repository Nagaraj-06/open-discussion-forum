const db = require("../../config/db");

const ReplyController = {
  addReply: async (req, res) => {
    try {
      const from_email = req.body.from_email;
      const to_email = req.body.to_email;
      const language_id = req.body.language_id;
      const level_id = req.body.level_id;
      const post_id = req.body.post_id;
      const body = req.body.body;
      const date = req.body.date;
      const time = req.body.time;
      const image = req.file ? req.file.filename : null;

      let = sqlquery = "";
      let = queryParams = [];

      if (image) {
        sqlquery =
          "INSERT INTO reply_details (from_email,to_email,language_id,level_id,post_id,body,image,date,time) VALUES (?, ?,?, ?, ?, ?, ? ,? ,?)";
        queryParams = [
          from_email,
          to_email,
          language_id,
          level_id,
          post_id,
          body,
          image,
          date,
          time,
        ];
      } else {
        sqlquery =
          "INSERT INTO reply_details (from_email,to_email,language_id,level_id,post_id,body,date,time ) VALUES (? ,?,? ,?,? , ? ,?, ?)";
        queryParams = [
          from_email,
          to_email,
          language_id,
          level_id,
          post_id,
          body,
          date,
          time,
        ];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error inserting question");
        } else {
          res.send("Reply added successfully");
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  EditMainReply: async (req, res) => {
    try {
      const editReplyId = req.body.editReplyId;
      const post_id = req.body.post_id;
      const body = req.body.body;
      const image = req.file ? req.file.filename : null;

      let = sqlquery = "";
      let = queryParams = [];

      if (image) {
        sqlquery =
          "update reply_details set body=? ,image=? where id=? and post_id=?";
        queryParams = [body, image, editReplyId, post_id];
      } else {
        sqlquery =
          "update reply_details set body=?,image=?  where id=? and post_id=?";
        queryParams = [body, null, editReplyId, post_id];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error inserting question");
        } else {
          res.send({ Status: "Main Reply Edited successfully.." });
        }
      });
    } catch (error) {
      // console.log("Error Occurs...");
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  addSubreply: async (req, res) => {
    try {
      const from_email = req.body.from_email;
      const to_main_replyid = req.body.to_main_replyid;
      const to_sub_replyid = req.body.to_sub_replyid;
      const body = req.body.body;
      const date = req.body.date;
      const time = req.body.time;
      const image = req.file ? req.file.filename : null;

      let = sqlquery = "";
      let = queryParams = [];

      if (to_sub_replyid == null) {
        if (image) {
          sqlquery =
            "INSERT INTO sub_replies (from_email,to_main_replyid,body,image,date,time ) VALUES (? , ?,?, ?, ?, ?)";
          queryParams = [from_email, to_main_replyid, body, image, date, time];
        } else {
          sqlquery =
            "INSERT INTO sub_replies ( from_email, to_main_replyid, body, date,time ) VALUES (? ,?, ?, ?, ? )";
          queryParams = [from_email, to_main_replyid, body, date, time];
        }
      } else if (to_main_replyid == null) {
        if (image) {
          sqlquery =
            "INSERT INTO sub_replies (from_email,to_sub_replyid,body,image,date,time ) VALUES (? , ?, ?, ?, ?, ? )";
          queryParams = [from_email, to_sub_replyid, body, image, date, time];
        } else {
          sqlquery =
            "INSERT INTO sub_replies ( from_email, to_sub_replyid , body, date,time ) VALUES (? ,? ,? , ?, ?)";
          queryParams = [from_email, to_sub_replyid, body, date, time];
        }
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

  Editsubreplies: async (req, res) => {
    try {
      const editing_sub_id = req.body.sub_id;
      const body = req.body.body;
      const image = req.file ? req.file.filename : null;

      let = sqlquery = "";
      let = queryParams = [];

      if (image) {
        sqlquery = "update sub_replies set body=?,image=? where id=?";
        queryParams = [body, image, editing_sub_id];
      } else {
        sqlquery = "update sub_replies set body=?,image=? where id=? ";
        queryParams = [body, null, editing_sub_id];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error inserting question");
        } else {
          res.send({ Status: "Sub Reply Edited SuccesFully..!!" });
        }
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  is_reply_liked: async (req, res) => {
    try {
      const email = req.body.email;
      const id = req.body.id;
      const MainReplyId = req.body.MainReplyId;
      const SubReplyId = req.body.SubReplyId;
      // console.log("SubReply and Main checking ",SubReplyId==null,MainReplyId==null)

      let = sqlquery = "";
      let = queryParams = [];

      if (SubReplyId == null) {
        sqlquery =
          "select email from reply_likes where post_id=? and email=? and MainReplyId=?";
        queryParams = [id, email, MainReplyId];
      } else if (MainReplyId == null) {
        sqlquery =
          "select email from reply_likes where post_id=? and email=? and SubReplyId=?";
        queryParams = [id, email, SubReplyId];
      }

      // console.log("  ",email,id)
      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length == 0) {
            return res.json({ status: "yes" });
          } else {
            // console.log("like data found..!")
            res.json({ status: "no" });
          }
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  is_reply_saved: async (req, res) => {
    try {
      const email = req.body.email;
      const id = req.body.id;
      const MainReplyId = req.body.MainReplyId;
      const SubReplyId = req.body.SubReplyId;

      let = sqlquery = "";
      let = queryParams = [];

      if (SubReplyId == null) {
        sqlquery =
          "select email from reply_saved where post_id=? and email=? and MainReplyId=?";
        queryParams = [id, email, MainReplyId];
      } else if (MainReplyId == null) {
        sqlquery =
          "select email from reply_saved where post_id=? and email=? and SubReplyId=?";
        queryParams = [id, email, SubReplyId];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result.length == 0) {
            return res.json({ status: "yes" });
          } else {
            res.json({ status: "no" });
            // console.log("save2 data found..!")
          }
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  add_reply_like: async (req, res) => {
    try {
      const email = req.body.email;
      const id = req.body.id;
      const MainReplyId = req.body.MainReplyId;
      const SubReplyId = req.body.SubReplyId;

      let = sqlquery = "";
      let = queryParams = [];

      if (SubReplyId == null) {
        sqlquery =
          "insert into reply_likes(email,post_id,MainReplyId) values (?,?,?)";
        queryParams = [email, id, MainReplyId];
      } else if (MainReplyId == null) {
        sqlquery =
          "insert into reply_likes(email,post_id,SubReplyId) values (?,?,?)";
        queryParams = [email, id, SubReplyId];
      }

      console.log(queryParams);

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          return res.json({ status: "added" });
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  saveReply: async (req, res) => {
    try {
      const email = req.body.email;
      const id = req.body.id;
      const MainReplyId = req.body.MainReplyId;
      const SubReplyId = req.body.SubReplyId;
      let = sqlquery = "";
      let = queryParams = [];
      let status = "1";

      if (SubReplyId == null) {
        sqlquery =
          "select status from reply_saved where email=? and post_id=? and MainReplyId=?";
        queryParams = [email, id, MainReplyId];
      } else if (MainReplyId == null) {
        sqlquery =
          "select status from reply_saved where email=? and post_id=? and SubReplyId=?";
        queryParams = [email, id, SubReplyId];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          return err;
        } else {
          if (result.length == 0) {
            if (SubReplyId == null) {
              sqlquery =
                "insert into reply_saved(email,post_id,MainReplyId,status) values (?,?,?,?)";
              queryParams = [email, id, MainReplyId, status];
            } else if (MainReplyId == null) {
              sqlquery =
                "insert into reply_saved(email,post_id,SubReplyId,status) values (?,?,?,?)";
              queryParams = [email, id, SubReplyId, status];
            }

            db.query(sqlquery, queryParams, (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else {
                return res.json({ status: "inserted.! " });
              }
            });
          } else {
            console.log(result[0].status);
            if (result[0].status == 0) {
              status = "1";
            } else {
              status = "0";
            }

            if (SubReplyId == null) {
              sqlquery =
                "update reply_saved set status=? where email=? and post_id=? and MainReplyId=?";
              queryParams = [status, email, id, MainReplyId];
            } else if (MainReplyId == null) {
              sqlquery =
                "update reply_saved set status=? where email=? and post_id=? and SubReplyId=?";
              queryParams = [status, email, id, SubReplyId];
            }

            db.query(sqlquery, queryParams, (err, result) => {
              if (err) {
                console.log(err);
                return;
              } else {
                return res.json({ status: "updated.!" });
              }
            });
          }
        }
      });
    } catch (error) {
      res.status(500).send({
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  getreplies: async (req, res) => {
    try {
      db.query("select * from reply_details", (err, result) => {
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

  getSubreplies1: async (req, res) => {
    try {
      let id;
      let sqlquery;

      if (req.body.SubReplyId == null) {
        id = req.body.MainReplyId;
        sqlquery = "select * from sub_replies where to_main_replyid=? ";
      } else if (req.body.MainReplyId == null) {
        id = req.body.SubReplyId;
        sqlquery = "select * from sub_replies where to_sub_replyid=? ";
      }

      db.query(sqlquery, [id], (err, result) => {
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

  getmainreplies: async (req, res) => {
    try {
      const post_id = req.body.post_id;

      db.query(
        "select * from reply_details where post_id =?",
        [post_id],
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

  deltReply: async (req, res) => {
    try {
      let id;
      let sqlquery;
      let queryParams;

      if (req.body.SubReplyId == null) {
        id = req.body.MainReplyId;
        sqlquery = "delete from reply_details where id=?";
        queryParams = [id];
      } else if (req.body.MainReplyId == null) {
        id = req.body.SubReplyId;
        sqlquery = "delete from sub_replies where id=?";
        queryParams = [id];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log("Reply deleted Success in Repl_details");
        }
      });
      db.query(
        "select id from reply_likes where MainReplyId=?",
        [id],
        (err, resultt) => {
          if (err) return res.status(500).send(err);
          else {
            if (resultt.length > 0) {
              db.query(
                `delete from reply_likes where id in (${resultt
                  .map((item) => item.id)
                  .join(", ")} )`,
                (err, result) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    console.log("Reply deleted in reply_likes");
                  }
                }
              );
            }
          }
        }
      );
      db.query(
        "select id from reply_saved where MainReplyId=?",
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
                    console.log("Reply deleted in reply_saved");
                  }
                }
              );
            }
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

  EditReply: async (req, res) => {
    try {
      const id = req.body.id;
      db.query(
        "select * from reply_details where id=?",
        [id],
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

  EditSubReply: async (req, res) => {
    try {
      const id = req.body.id;
      db.query("select * from sub_replies where id=?", [id], (err, result) => {
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

  GetReplyLang_Level: async (req, res) => {
    try {
      const { language_id, level_id } = req.body;

      db.query(
        "select * from reply_details where level_id=? and language_id=?",
        [language_id, level_id],
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

  getlang_reply: async (req, res) => {
    try {
      const language_id = req.query.language_id;

      db.query(
        "select * from reply_details where language_id=?",
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
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  userReplies: async (req, res) => {
    try {
      const from_email = req.body.email;

      db.query(
        "select * from reply_details where from_email=?",
        [from_email],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // console.log(result)
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

module.exports = { ReplyController };
