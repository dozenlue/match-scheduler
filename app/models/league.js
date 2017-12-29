import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  registeredPlayers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
});

LeagueSchema.methods = {
  // Generate all matches for this league
  scheduleMatches() {

  },

  // Generate matches for a player in this league
  // Return: An array of generated matches
  scheduleMatchesForPlayer(playedId, save) {

  },

  // List all matches for this league
  listAllMatches() {

  },

  // List all matches scheduled for a player
  listPlayerMatches(playerId) {

  },

  listPlayerMatchesWithOpponent(playerId, opponentId) {

  }
};

const LeagueModel = mongoose.model('League', LeagueSchema);

export default LeagueModel;
