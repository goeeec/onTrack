const express = require("express");
const router = express.Router();
const request = require("request");

const Project = require("../models").Project;
const User = require("../models").User;
const Branch = require("../models").Branch;

const githubEndpoint = 'https://api.github.com';

// Create new repo
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
  }, async (err, response, body) => {
    let result = JSON.parse(body);
    if (response.statusCode === 201) {
      try {
        let project = await Project.create({
          projectId: result.id,
          name: result.name,
          description: result.description,
          cloneUrl: result.clone_url,
        });
        let owner = await User.findOne({ where: { githubId: result.owner.id } });
        await project.setOwner(owner);
      } catch(err) {
        console.log(err);
        console.log("Failed to create Project object in DB");
      }
      res.status(201).json({
        id: result.id,
        cloneUrl: result.clone_url,
        owner: { login: result.owner.login, id: result.owner.id }
      });
    } else {
      res.status(200).send({ error: result });
    }
  });
})

// Get branches on one existing repo
router.get("/branches/:owner/:repo", (req, res) => {
  const uri = '/repos/' + req.params.owner + '/' + req.params.repo + '/git/refs';
  request.get({
    url: githubEndpoint + uri,
    headers: {
      'User-Agent': 'onTrack-dev'
    }
  }, (err, response, body) => {
    const result = JSON.parse(body);
    if (response.statusCode === 200) {
      let branches = result.map(branch => {
        let parts = branch.ref.split("/");
        return ({ 
          name: parts[parts.length - 1],
          sha: branch.object.sha,
          location: branch.ref,
          nodeId: branch.node_id
        });
      });
      res.status(200).send(branches);
    } else {
      console.log('error getting branches ref, an empty list will be sent back');
      res.status(200).send([]);
    }
  })
})

// Create a new branch on a repo
router.post("/branches/:owner/:repo", async (req, res) => {
  const uri = "/repos/" + req.params.owner + "/" + req.params.repo + "/git/refs";
  const projectId = (await Project.findOne({ where: { name: req.params.repo } })).id;
  const sha = (await Branch.findOne({ where: { name: req.body.baseBranch, projectId: projectId } })).sha;
  console.log("Branch create URI: ", githubEndpoint + uri);
  const data = {
    "ref": "refs/heads/" + req.body.newBranchName,
    "sha": sha
  };
  console.log("body created: ", data);
  request.post({
    url: githubEndpoint + uri,
    headers: {
      'User-Agent': 'onTrack-dev',
      'Authorization': 'token ' + req.user.accessToken
    },
    body: JSON.stringify(data)
  }, async (err, response, body) => {
    const result = JSON.parse(body);
    console.log(response.statusCode, result);
    if (response.statusCode === 201) {
      const name = result.ref.split("/");
      const newBranch = await Branch.create({
        name: name[name.length - 1],
        nodeId: result.node_id,
        sha: result.object.sha,
        projectId: projectId,
        location: result.ref
      });
      res.status(201).json(newBranch);
    } else {
      res.send(response);
    }
  })
})

// Get info of one repo
router.get("/repos/:user/:repo", (req, res) => {
  const uri = "/repos/" + req.params.user + "/" + req.params.repo;
  console.log("URI: ", uri);
  request.get({
    url: githubEndpoint + uri,
    headers: {
      'User-Agent': 'onTrack-dev'
    }
  }, (err, response, body) => {
    const result = JSON.parse(body);
    const project = {
      id: result.id,
      owner: result.owner,
      description: result.description,
      cloneUrl: result.clone_url,
      name: result.name
    }
    res.send(project);
  })
})

module.exports = router;
