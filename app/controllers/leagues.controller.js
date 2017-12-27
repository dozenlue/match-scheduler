import BaseController from './base.controller';
import LeagueModel from '../models/league';

class LeaguesController extends BaseController {
  // List all leagues
  list = async (req, res, next) => {
    try {
      res.json(await LeagueModel.find());
    } catch(err) {
      next(err);
    }
  }

  // Create a league
  create = async (req, res, next) => {
  }

  // Get a specific league info
  get = async (req, res, next, leagueId) => {
  }

  // Update or start/stop a league
  update = async (req, res, next, leagueId) => {
  }

  // User register
  registerPlayer = async (req, res, next, leagueId) => {
  }

  // List all registered players
  listRegisteredPlayers = async (req, res, next, leagueId) => {
  }

  // Add a player to take part in a league
  addPlayer = async (req, res, next, leagueId) => {
  }

  // List all players
  listPlayers = async (req, res, next, leagueId) => {
  }

  // Remove a player
  removePlayer = async (req, res, next, leagueId, playerId) => {
  }
}

export default new LeaguesController();
