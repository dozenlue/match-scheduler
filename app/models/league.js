import mongoose from 'mongoose';
import MatchModel from './match';

const Schema = mongoose.Schema;

const LeagueSchema = new Schema({
  name: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  status: {
    type: String,
    enum: ['accepting', 'ongoing', 'stopped'],
    default: 'accepting',
  },
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
    matches = [];
    for (i = 0; i < this.players.length; i++) {
      for (j = i + 1; j < this.players.length; j++) {
        matches.push({
          league: this._id,
          players: [
            this.players[i], this.players[j]
          ]
        });
      }
    }

    Match.create(matches);
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
