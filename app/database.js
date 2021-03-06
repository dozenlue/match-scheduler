import mongoose from 'mongoose';
import Constants from './constants';

// Use native promises
mongoose.Promise = global.Promise;

// Connect to our mongo database;
mongoose.connect(Constants.mongo.uri, {
  useMongoClient: true,
});
mongoose.connection.on('error', (err) => {
  throw err;
});
