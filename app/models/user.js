import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  openId: {
    type: String,
    unique: true,
    required: [true, 'Openid is mandatory.'],
    validate: {
      isAsync: true,
      validator: function(openid, respond) {
        UserModel.findOne({ openid })
          .then((user) => {
            respond(user ? false : true, "User already registered.");
          })
          .catch(() => {
            respond(false, "Error occurs while checking if user already registered.");
          });
      },
      message: "User already registered."
    }
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
