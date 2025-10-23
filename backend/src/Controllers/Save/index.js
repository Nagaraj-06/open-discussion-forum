const db = require("../../config/db");

const SavedController = {
  fetch_saved: async (req, res) => {
    try {
      let list = [];
      const { email } = req.body;
      db.query(
        "select * from saved where email=? and status=?",
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
                        // console.log(resultt);
                        list.push(...resultt);
                        resolve(resultt);
                        // res.send(resultt);
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
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  fetch_Replysaved: async (req, res) => {
    try {
      let list = [];
      const { email } = req.body;
      db.query(
        "select * from reply_saved where email=? and status=?",
        [email, "1"],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            // res.send(result);
            // console.log(result)
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
        message: "Error occurs while fetch language datas..",
        error: error.message,
      });
    }
  },

  is_post_nosaved: async (req, res) => {
    try {
      const id = req.body.id;
      const email = req.body.email;
      console.log(id, email);
      db.query(
        "SELECT email,status FROM saved WHERE post_id = ? AND email = ?",
        [id, email],
        (err, result) => {
          if (err) {
            console.error("Database error:", err.message);
            res.status(500).send({ error: err.message });
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
        error: error.message,
      });
    }
  },

  savePost: async (req, res) => {
    try {
      const { email, id } = req.body;
      let status = "1";

      db.query(
        "select status from saved where email=? and post_id=?",
        [email, id],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result.length == 0) {
              db.query(
                "insert into saved(email,post_id,status) values (?,?,?)",
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
                "update saved set status=? where email=? and post_id=?",
                [status, email, id],
                (err, result) => {
                  if (err) {
                    console.log(err);
                    return;
                  } else {
                    return res.json({ status: "updated..!" });
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
};

module.exports = { SavedController };
