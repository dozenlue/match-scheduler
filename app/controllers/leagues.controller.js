import BaseController from './base.controller';
import LeagueModel from '../models/league';

class LeaguesController extends BaseController {
  listAll = async (req, res, next) => {
    try {
      res.json(await LeagueModel.find());
    } catch(err) {
      next(err);
    }
  }

  create = async (req, res, next) => {
  }

  get = async (req, res, next, leagueId) => {
  }

  update = async (req, res, next, leagueId) => {
  }

  registerPlayer = async (req, res, next, leagueId) => {
  }

  listRegisteredPlayers = async (req, res, next, leagueId) => {
  }

  addPlayer = async (req, res, next, leagueId) => {
  }

  listPlayers = async (req, res, next, leagueId) => {
  }

  removePlayer = async (req, res, next, leagueId) => {
  }
}

export default new LeaguesController();
