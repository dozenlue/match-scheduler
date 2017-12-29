import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  openId: {
    type: String,
    unique: true,
    required: [true, 'Openid is mandatory.'],
  },
  name: {
    type: String,
    required: [true, 'Username is required.'],
  },
  rank: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'K', 'NA'],
    default: 'NA'
  },
  role: {
    type: String,
    enum: ['anonymous', 'player', 'admin'],
    default: 'player',
  },
  org: { type: String },
  location: { type: String },
  imageUrl: { type: String },
});

// Validate openid is not taken
UserSchema
  .path('openId')
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
UserSchema.method({
  getLeagues() {
    return {};
  },

  getLeagueMatches() {
    return {};
  },

  getLeagueOpponents() {
    return {};
  },
});

UserSchema.statics = {
  anonymousUser() {
    return new UserModel({
      openId: "dummy-open-id",
      name: "Anonymouse User",
      rank: "NA",
      role: "anonymous"
    });
  },

  getByOpenId(openId) {
    return this.findOne({'openId': openId});
  }
};

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
