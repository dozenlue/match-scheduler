import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const MatchSchema = new Schema({
  title: {
    type: String,
  },
  players: {
    type: Schema.Types.Mixed,
  },
  winner: {
    player: { type: String, lowercase: true, trim: true, },
    confirmedDate: { type: Date },
  },
  loser: {
    player: { type: String, lowercase: true, trim: true, },
    confirmedDate: { type: Date },
  },
  matchLink: { type: String },
});
