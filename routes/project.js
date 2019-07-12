const express = require("express");

const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving projects" });
    });
});

// router.get("/", (req, res) => {});

router.post("/", (req, res) => {
  const project = req.body;
  Projects.insert(project)
    .then(project => {
      //console.log("happy path");
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error adding the project"
      });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const project = req.body;
  //console.log("id", id);
  //console.log("project", project);
  Projects.update(id, project)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the project"
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Projects.remove(id)
    .then(project => {
      console.log("happy path");
      console.log("result", project);
      if (project) {
        res.status(200).json({ message: "The project has been deleted" });
      } else {
        res.status(404).json({ message: "The project could not be found" });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "There was an error removing the project" });
    });
});

module.exports = router;
