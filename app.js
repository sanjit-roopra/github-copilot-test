const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/workflow/:owner/:repo/:workflow', async (req, res) => {
    const { owner, repo, workflow } = req.params;
  
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/runs`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`
        }
      });
  
      const runs = response.data.workflow_runs.map(run => {
        const createdAt = new Date(run.created_at);
        const updatedAt = new Date(run.updated_at);
        const duration = (updatedAt - createdAt) / 60000; // Convert ms to minutes
  
        return {
          url: run.html_url,
          duration
        };
      });
  
      res.json(runs);
    } catch (error) {
      res.json({ error: error.message });
    }
  });
  

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});