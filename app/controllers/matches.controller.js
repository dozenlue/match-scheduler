import BaseController from './base.controller';
import LeagueModel from '../models/league';
import MatchModel from '../models/league';

class MatchesController extends BaseController {
  listAll = async (req, res, next, leagueId) => {
    try {
      res.json(await LeagueModel.find());
    } catch(err) {
      next(err);
    }
  }

  get = async (req, res, next, leagueId, matchId) => {
  }

  
}

export default new LeaguesController();
