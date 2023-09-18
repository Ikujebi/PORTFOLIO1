const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://ikujebikehinde:<password>@cluster0.ybek6vs.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'your_database_name'; // Replace with your actual database name

const connectToMongoDB = async () => {
  const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    throw err;
  }
};

module.exports = { connectToMongoDB };
