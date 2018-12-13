const express = require("express");
const router = express.Router();
const Project = require("../models").Project;
const User = require("../models").User;
const Branch = require("../models").Branch;

// return the project in DB
router.get("/project/:id", async (req, res) => {
  const target = await Project.findOne({
    where: { projectId: req.params.id },
    include: [
      { model: Branch },
      { model: User, as: "owner" },
      { model: User, as: "member" }
    ]
  });
  if (target) {
    res.status(200).json(target);
  } else {
    res.status(404).send('Project not found');
  }
})

// save a project into DB
router.post("/project", async (req, res) => {
  const existingProject = await Project.findOne({ where: { projectId: req.body.projectId + '' } });
  if (existingProject) {
    res.status(400).send('Duplicated project');
  } else {
    try {
      let project = await Project.create({
        projectId: req.body.projectId + '',   // change to string type
        name: req.body.name,
        description: req.body.description,
        cloneUrl: req.body.cloneUrl
      });
      // find the current user in the DB
      let owner = await User.findOne({ where: { githubId: req.body.owner } });
      await project.setOwner(owner);
      await project.setMember(owner);

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
          } else {
            // update the associated projectId
            await existingBranch.update({ projectId: project.id });
          }
        } catch(err) { console.log(err) }
      });
      res.sendStatus(201);
    } catch(err) {
      console.log(err);
    }
  }
})

module.exports = router;
