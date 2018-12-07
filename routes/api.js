const express = require("express");
const router = express.Router();
const Project = require("../models").Project;
const Branch = require("../models").Branch;

router.get("/project/:id", async (req, res) => {
  const target = await Project.findOne({
    where: { projectId: req.params.id },
    include: [{ model: Branch }]
  });
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
  //console.log('Creating new Project: ', req.body);
  res.sendStatus(201);
  try {
    let project = await Project.create({
      projectId: req.body.projectId + '',   // change to string type
      name: req.body.name,
      description: req.body.description,
      cloneUrl: req.body.cloneUrl,
      owner: req.body.owner,
    });
    console.log("Now mapping branches to project id: ", project.id);
    console.log("Branch number: ", req.body.branches.length);
    req.body.branches.map(async branch => {
      try {
        console.log("Received branch object: ", branch);
        existingBranch = await Branch.findOne({ where: { nodeId: branch.nodeId } });
        if (!existingBranch) {
          await Branch.create({
            name: branch.name,
            sha: branch.sha,
            location: branch.location,
            nodeId: branch.nodeId,
            projectId: project.id
          });
        }
      } catch(err) { console.log(err) }
    })
  } catch(err) {
    console.log(err);
  }
})

module.exports = router;
