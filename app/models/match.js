import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MatchSchema = new Schema({
  title: { type: String },
  result: { type: String },
  league: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  players: {[
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
  ]},
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  claimedDate: { type: Date },
  confirmedDate: { type: Date },
  matchLink: { type: String },
});

const MatchModel = mongoose.model('Match', MatchSchema);

export default MatchModel;
