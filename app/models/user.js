import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  openid: {
    type: String,
    unique: true,
    required: [true, 'Openid is mandatory.'],
  },
  username: {
    type: String,
    required: [true, 'Username is required.'],
  },
  role: {
    type: String,
    default: 'user',
  },
  org: { type: String },
  location: { type: String },
  imageUrl: { type: String },
});

// Validate openid is not taken
UserSchema
  .path('openid')
  .validate((openid, respond) => {
    UserModel.findOne({ openid })
      .then((user) => {
        respond(user ? false : true);
      })
      .catch(() => {
        respond(false);
      });
  }, 'User already registered.');

/**
 * User Methods
 */
UserSchema.methods = {
  getLeagues() {
    return {};
  },

  getLeagueMatches() {
    return {};
  },

  getLeagueOpponents() {
    return {};
  },
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
