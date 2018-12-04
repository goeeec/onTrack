const express = require("express");
const router = express.Router();
const request = require("request");
const Project = require("../models").Project;

const githubEndpoint = 'https://api.github.com';

router.post("/create_project", (req, res) => {
  const data = {
    name: req.body.name,
    description: req.body.description,
    private: false
  };

  request.post({
    url: githubEndpoint + '/user/repos',
    headers: {
      'Authorization': 'token ' + req.body.accessToken,
      'User-Agent': 'onTrack-dev'
    },
    body: JSON.stringify(data)
  }, (err, response, body) => {
    let result = JSON.parse(body);
    if (response.statusCode === 201) {
      res.status(201);
      res.json({
        id: result.id,
        cloneUrl: result.clone_url,
        owner: { username: result.owner.login, id: result.owner.id }
      });
    } else {
      res.status(200).send({ error: result });
    }
  });
})

router.get("/branches/:owner/:repo", (req, res) => {
  const uri = '/repos/' + req.params.owner + '/' + req.params.repo + '/git/refs';
  request.get({
    url: githubEndpoint + uri,
    headers: {
      'User-Agent': 'onTrack-dev'
    }
  }, (err, response, body) => {
    let result = JSON.parse(body);
    if (response.statusCode === 200) {
      let branches = result.map(branch => {
        return ({ ref: branch.ref, sha: branch.object.sha });
      });
      console.log('branches', branches);
      res.status(200).send(branches);
    } else {
      console.log('error getting branches ref');
      res.sendStatus(404);
    }
  })
})

router.post("/project", async (req, res) => {
  const existingProject = await Project.findOne({ where: { projectId: req.body.projectId } });
  if (existingProject) {
    res.send(400, 'Duplicated project');
  }
  console.log('Creating new Project: ', req.body);
  res.sendStatus(201);
  await Project.create({
    projectId: req.body.projectId,
    name: req.body.name,
    description: req.body.description,
    cloneUrl: req.body.cloneUrl,
    owner: req.body.owner
  })
})

router.get("/project/:id", async (req, res) => {
  const target = await Project.findOne({ where: { projectId: req.params.id } });
  if (target) {
    res.status(200).json(target);
  } else {
    res.status(404).send('Project not found');
  }
})

module.exports = router;
