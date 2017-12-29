import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  title: { type: String },
  result: { type: String },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'League',
    required: true,
  },
  players: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  }],
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  claimedDate: { type: Date },
  confirmedDate: { type: Date },
  matchLink: { type: String },
});

MatchSchema.statics = {
  findByLeagueId(leagueId) {
    return this.find({'league': leagueId});
  }
};

const MatchModel = mongoose.model('Match', MatchSchema);

export default MatchModel;
