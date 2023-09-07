const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static HTML files (your portfolio)
app.use(express.static('public'));

// Handle form submissions
app.post('/contact', (req, res) => {
  // Access form data from the request body
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  // You can now process, store, or send this data as needed
  // For example, you could send an email, save it to a database, etc.

  // Send a response to the client (your portfolio)
  res.send('Message received successfully!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});