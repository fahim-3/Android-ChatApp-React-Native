const Message = require("../models/MessageModel");

module.exports = app => {
  app.get("/messages", (req, res) => {
    Message.find()
    .then(messages => {
        res.send(messages);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving messages."
        });
    });
  });
  app.post("/messages", (req, res) => {
    // Create a User
    const message = new Message({
      message: req.body.message,
      senderId: req.body.senderId,    
      senderName: req.body.senderName  
    });

    // Save User in the database
    message
      .save()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while sending message."
        });
      });
  });
    app.delete("/messages/:messageId", (req, res) => {
        Message.findByIdAndRemove(req.params.messageId)
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "Message not found with id " + req.params.messageId
                    });
                }
                res.send({ message: "Message deleted successfully!" });
            })
            .catch(err => {
                if (err.kind === "ObjectId" || err.name === "Not Found") {
                    return res.status(404).send({
                        message: "Message not found with id " + req.params.messageId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete message with id " + req.params.messageId
                });
            });
    });
};
