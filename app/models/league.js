import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  title: { type: String },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  loser: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  claimedDate: { type: Date },
  confirmedDate: { type: Date },
  matchLink: { type: String },
});

const LeagueSchema = new Schema({
  name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  matches: [ MatchSchema ],
});

LeagueSchema.methods = {
  winnerClaim(winner, loser) {
    // Winner and Loser both must be added players
    if (0 > this.players.indexOf(winner) || 0 > this.players.indexOf(loser)) {
      return false;
    }

    // A match cannot be claimed twice
    
  }
};

const LeagueModel = mongoose.model('League', LeagueSchema);

export default LeagueModel;
