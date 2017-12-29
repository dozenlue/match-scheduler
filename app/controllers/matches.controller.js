import BaseController from './base.controller';
import MatchModel from '../models/match';

class MatchesController extends BaseController {
  // List all matches in a league
  listLeagueMatches = async (req, res, next) => {
    const leagueId = req.params.leagueId;
    console.log("Listing league registered players with league id: " + leagueId);

    try {
      res.json(await MatchModel.findByLeagueId(leagueId));
    } catch(err) {
      next(err);
    }
  }

  // Get a specific match
  get = async (req, res, next, leagueId, matchId) => {
  }

  // Claim or confirm a match result
  update = async (req, res, next, leagueId, matchId) => {
  }
}

export default new MatchesController();
