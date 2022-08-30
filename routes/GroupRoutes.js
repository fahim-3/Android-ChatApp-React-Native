const Group = require("../models/GroupsModel");

module.exports = app => {
  app.get("/groups", (req, res) => {
      Group.find()
    .then(groups => {
        res.send(groups);
    }).catch(err => {
        res.status(500).send({
            group: err.group || "Some error occurred while retrieving groups."
        });
    });
  });
  app.post("/groups", (req, res) => {
    // Create a group
    const groups = new Group({
      Groupname: req.body.Groupname,
      UserId: req.body.UserId,
      userName: req.body.userName
    });

    // Save User in the database
      groups.save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
            group: err.group || "Some error occurred while sending message."
        });
      });
  });
    app.delete("/groups/:groupId", (req, res) => {
        Group.findByIdAndRemove(req.params.groupId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        group: "Group not found with id " + req.params.groupId
                    });
                }
                res.send({ group: "Group deleted successfully!" });
            })
            .catch(err => {
                if (err.kind === "ObjectId" || err.name === "Not Found") {
                    return res.status(404).send({
                        group: "Group not found with id " + req.params.groupId
                    });
                }
                return res.status(500).send({
                    group: "Could not delete group with id " + req.params.groupId
                });
            });
    });
};
