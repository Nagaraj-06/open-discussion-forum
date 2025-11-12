const db = require("../../config/db");

const Fav_Controllers = {
  Getfavourites: async (req, res) => {
    try {
      const { email } = req.body;

      let list = [];
      db.query(
        "select * from likes where email=? and status=?",
        [email, "1"],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            Promise.all(
              result.map((item, i) => {
                return new Promise((resolve, reject) => {
                  db.query(
                    "select * from questions where id =?",
                    [item.post_id],
                    (err, resultt) => {
                      if (err) {
                        console.log(err);
                        reject(err);
                      } else {
                        list.push(...resultt);
                        resolve(resultt);
                      }
                    }
                  );
                });
              })
            )
              .then(() => {
                res.send(list);
                list = [];
              })
              .catch((err) => console.log(err));
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  ReplyFavourites: async (req, res) => {
    try {
      let list = [];
      const { email } = req.body;
      db.query(
        "select * from reply_likes where email=? and status=?",
        [email, "1"],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            Promise.all(
              result.map((item, i) => {
                return new Promise((resolve, reject) => {
                  if (item?.SubReplyId == null) {
                    db.query(
                      "select * from reply_details where id =?",
                      [item.MainReplyId],
                      (err, resultt) => {
                        if (err) {
                          console.log(err);
                          reject(err);
                        } else {
                          list.push(...resultt);
                          resolve(resultt);
                        }
                      }
                    );
                  }
                  if (item?.MainReplyId == null) {
                    db.query(
                      "select * from sub_replies where id =?",
                      [item.SubReplyId],
                      (err, resultt) => {
                        if (err) {
                          console.log(err);
                          reject(err);
                        } else {
                          list.push(...resultt);
                          resolve(resultt);
                        }
                      }
                    );
                  }
                });
              })
            )
              .then(() => {
                res.send(list);
                list = [];
              })
              .catch((err) => console.log(err));
          }
        }
      );
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },

  is_post_noliked: async (req, res) => {
    try {
      const email = req.body.email;
      const id = req.body.id;
      db.query(
        "select email,status from likes where post_id=? and email=?",
        [id, email],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.length == 0) {
              return res.json({ status: "yes" });
            } else {
              if (result[0].status == 0) {
                return res.json({ status: "yes" });
              }
              res.json({ status: "no" });
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

  addlike: async (req, res) => {
    try {
      const email = req.body.email;
      const id = req.body.id;
      let status = "1";

      db.query(
        "select status from likes where email=? and post_id=?",
        [email, id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.length == 0) {
              db.query(
                "insert into likes(email,post_id,status) values (?,?,?)",
                [email, id, status],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    return res.json({ status: "added" });
                  }
                }
              );
            } else {
              if (result[0].status == 0) {
                status = "1";
              } else {
                status = "0";
              }
              db.query(
                "update likes set status=? where email=? and post_id=?",
                [status, email, id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    return res.json({ status: "status updated..!" });
                  }
                }
              );
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

  add_reply_like: async (req, res) => {
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
          "select status from reply_likes where email=? and post_id=? and MainReplyId=?";
        queryParams = [email, id, MainReplyId];
      } else if (MainReplyId == null) {
        sqlquery =
          "select status from reply_likes where email=? and post_id=? and SubReplyId=?";
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
                "insert into reply_likes(email,post_id,MainReplyId,status) values (?,?,?,?)";
              queryParams = [email, id, MainReplyId, status];
            } else if (MainReplyId == null) {
              sqlquery =
                "insert into reply_likes(email,post_id,SubReplyId,status) values (?,?,?,?)";
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
            if (result[0].status == 0) {
              status = "1";
            } else {
              status = "0";
            }

            if (SubReplyId == null) {
              sqlquery =
                "update reply_likes set status=? where email=? and post_id=? and MainReplyId=?";
              queryParams = [status, email, id, MainReplyId];
            } else if (MainReplyId == null) {
              sqlquery =
                "update reply_likes set status=? where email=? and post_id=? and SubReplyId=?";
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
        error: error.message,
      });
    }
  },

  post_likes: async (req, res) => {
    try {
      const id = req.body.post_id;
      db.query(
        "SELECT COUNT(*) AS total_likes FROM likes WHERE post_id = ? AND status = ?",
        [id, "1"],
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

  replyLikes: async (req, res) => {
    try {
      const id = req.body.id;
      const MainReplyId = req.body.MainReplyId;
      const SubReplyId = req.body.SubReplyId;

      if (SubReplyId == null) {
        sqlquery =
          "select * from reply_likes where post_id=? and MainReplyId =? ";
        queryParams = [id, MainReplyId];
      } else if (MainReplyId == null) {
        sqlquery =
          "select * from reply_likes where post_id=? and SubReplyId =? ";
        queryParams = [id, SubReplyId];
      }

      db.query(sqlquery, queryParams, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    } catch (error) {
      res.status(500).send({
        error: error.message,
      });
    }
  },
};

module.exports = { Fav_Controllers };
