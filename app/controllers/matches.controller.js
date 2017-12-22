import BaseController from './base.controller';
import LeagueModel from '../models/league';
import MatchModel from '../models/match';

class MatchesController extends BaseController {
  // List all matches in a league
  listAll = async (req, res, next, leagueId) => {
    try {
      res.json(await MatchModel.find());
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

export default new LeaguesController();
