const express = require("express");
const router = express.Router();
const Project = require("../models").Project;

router.get("/project/:id", async (req, res) => {
  const target = await Project.findOne({ where: { projectId: req.params.id } });
  if (target) {
    res.status(200).json(target);
  } else {
    res.status(404).send('Project not found');
  }
})

router.post("/project", async (req, res) => {
  const existingProject = await Project.findOne({ where: { projectId: req.body.projectId + '' } });
  if (existingProject) {
    res.send(400, 'Duplicated project');
  }
  console.log('Creating new Project: ', req.body);
  res.sendStatus(201);
  try {
    await Project.create({
      projectId: req.body.projectId + '',   // change to string type
      name: req.body.name,
      description: req.body.description,
      cloneUrl: req.body.cloneUrl,
      owner: req.body.owner,
      branches: req.body.branches
    })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;
