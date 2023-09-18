const express = require('express');
const bodyParser = require('body-parser');
const { connectToMongoDB } = require('./mongo-config'); // Adjust the path as needed

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve your static HTML files (your portfolio)
app.use(express.static('public'));

// Handle form submissions
app.post('/contact', async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;

  try {
    const db = await connectToMongoDB();
    const collection = db.collection('form_submissions');

    // Insert the form data into the collection
    await collection.insertOne({
      name,
      email,
      subject,
      message,
    });

    res.send('Message received successfully!');
  } catch (err) {
    console.error('Error handling form submission:', err);
    res.status(500).send('Internal server error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
