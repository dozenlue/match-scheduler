import BaseController from './base.controller';
import LeagueModel from '../models/league';

class LeaguesController extends BaseController {
  // List all leagues
  list = async (req, res, next) => {
    console.log("Listing all leagues");
    try {
      res.json(await LeagueModel.find());
    } catch(err) {
      next(err);
    }
  }

  // Create a league
  create = async (req, res, next) => {
    console.log("Creating a league: " + req.body.name);
    const newLeague = new LeagueModel({
      name: req.body.name,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate)
    });

    try {
      res.json(await newLeague.save());
    } catch(err) {
      next(err);
    }
  }

  // Get a specific league info
  get = async (req, res, next) => {
    const leagueId = req.params.leagueId;
    console.log("Getting league with id: " + leagueId);
    try {
      res.json(await LeagueModel.findById(leagueId));
    } catch(err) {
      next(err);
    }
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
