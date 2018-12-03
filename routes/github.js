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
        cloneUrl: result.clone_url
      });
    } else {
      res.status(200).send({ error: result });
    }
  });
})

module.exports = router;
