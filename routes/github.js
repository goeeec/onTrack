const express = require("express");
const router = express.Router();
const request = require("request");

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
    const result = JSON.parse(body);
    if (response.statusCode === 200) {
      let branches = result.map(branch => {
        return ({ ref: branch.ref, sha: branch.object.sha });
      });
      res.status(200).send(branches);
    } else {
      console.log('error getting branches ref');
      res.status(200).send([]);
    }
  })
})

router.get("/repos/:repo", (req, res) => {
  const uri = "/repos/" + req.user.login + "/" + req.params.repo;
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
