const express = require("express");

const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving actions" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const action = req.body;
  Actions.update(id, action)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the action"
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Actions.remove(id)
    .then(action => {
      console.log("happy path");
      console.log("result", action);
      if (action) {
        res.status(200).json({ message: "The action has been deleted" });
      } else {
        res.status(404).json({ message: "The action could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "There was an error removing the action" });
    });
});

module.exports = router;
