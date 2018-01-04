import BaseController from './base.controller';
import LeagueModel from '../models/league';

class LeaguesController extends BaseController {
  _startLeague = async (league) => {
    if (league.status == 'accepting' && league.players.length > 0) {
      leagueMatches = await league.scheduleMatches();
      if (leagueMatches && leagueMatches.length > 0) {
        league.status = 'ongoing';
        await league.save()
      }
    }

    return league;
  }

  _stopLeague = async (league) => {
    if (league.status == 'ongoing') {
      league.status = 'stopped';
      await league.save();
    }

    return league;
  }

  _editLeague = async (league, newLeague) => {
    if (newLeague.name) {
      league.name = newLeague.name;
    }

    await league.save();
    return league;
  }

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
  update = async (req, res, next) => {
    const leagueId = req.params.leagueId;
    const action = req.query.action || 'edit';

    try {
      league = await LeagueModel.findById(leagueId);
      if (!league) {
        res.status(400).end();
      } else {
        if (action == "start") {
          res.json(await this._startLeague(league));
        } else if (action == "stop") {
          res.json(await this._stopLeague(league));
        } else {
          res.json(await this._editLeague(league, req.body));
        }
      }
    } catch (err) {
      next(err);
    }
  }

  // User register. Add request user into 'registered' list
  registerPlayer = async (req, res, next) => {
    const leagueId = req.params.leagueId;
    console.log("Adding Registered Player to league: " + leagueId);

    try {
      if (req.user && req.user.role != 'anonymous') {
        var league = await LeagueModel.findById(leagueId);
        if (!league) {
          res.status(400).end();
        } else {
          league.registeredPlayers.push(req.user._id);
          res.json(await league.save());
        }
      } else {
        res.status(403).end();
      }
    } catch(err) {
      next(err);
    }
  }

  // List all registered players
  listRegisteredPlayers = async (req, res, next) => {
    const leagueId = req.params.leagueId;
    console.log("Getting Registered Players with League id: " + leagueId);
    try {
      var league = await LeagueModel.findById(leagueId);
      if (league) {
        res.json(league.registeredPlayers);
      } else {
        res.status(400).end();
      }
    } catch(err) {
      next(err);
    }
  }

  // Add a player to take part in a league
  addPlayer = async (req, res, next) => {
    const leagueId = req.params.leagueId;
    const playerId = req.body.playerId;
    console.log("Adding Player to league: " + playerId);

    try {
      league = await LeagueModel.findById(leagueId);
      if ( 0 <= league.registeredPlayers.indexOf(playerId)) {
        league.players.push(playerId);
        res.json(await league.save());
      } else {
        res.status(400).end();
      }
    } catch(err) {
      next(err);
    }
  }

  // List all players
  listPlayers = async (req, res, next) => {
    const leagueId = req.params.leagueId;
    console.log("Getting Players with League id: " + leagueId);
    try {
      league = await LeagueModel.findById(leagueId);
      res.json(league.players);
    } catch(err) {
      next(err);
    }
  }

  // Remove a player
  removePlayer = async (req, res, next, leagueId, playerId) => {
  }
}

export default new LeaguesController();
