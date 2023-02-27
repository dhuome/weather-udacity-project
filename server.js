// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const { z } = require('zod');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

app.get('/api', (req, res) => {
  res.status(200).json(projectData);
});

app.post('/api', (req, res) => {
  const schema = z.object({
    message: z.string(),
    temp: z.number(),
    date: z.string()
  });
  const validated = schema.safeParse(req.body);

  if (!validated.success) {
    return res.status(400).json(validated.error.issues);
  }
  projectData = validated.data;
  res.sendStatus(201);
})

// Setup Server
app.listen(3000, () => console.log('server is running on port 3000'))

