import { Router } from 'express';

import MetaController from './controllers/meta.controller';
import UsersController from './controllers/users.controller';
import LeaguesController from './controllers/leagues.controller';
import MatchesController from './controllers/matches.controller';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

routes.get('/', MetaController.index);

// Users
routes.get('/users', UsersController.search);
routes.post('/users', UsersController.create);
routes.get('/users/me', authenticate, UsersController.fetch);
routes.put('/users/me', authenticate, UsersController.update);
routes.delete('/users/me', authenticate, UsersController.delete);
routes.get('/users/:username', UsersController._populate, UsersController.fetch);

// Leagues/Matches
routes.get('/leagues', LeaguesController.list);
routes.post('/leagues', LeaguesController.create);
routes.get('leagues/:leagueId', LeaguesController.get);
routes.put('leagues/:leagueId', LeaguesController.update);
routes.get('leagues/:leagueId/registeredPlayers', LeaguesController.listRegisteredPlayers);
routes.post('leagues/:leagueId/registeredPlayers', LeaguesController.registerPlayer);
routes.get('leagues/:leagueId/players', LeaguesController.listPlayers);
routes.post('leagues/:leagueId/players', LeaguesController.addPlayer);
routes.delete('leagues/:leagueId/players/:playerId', LeaguesController.removePlayer);

routes.get('leagues/:leagueId/matches', MatchesController.listLeagueMatches);
routes.get('leagues/:leagueId/matches/:matchId', MatchesController.get);
routes.put('leagues/:leagueId/matches/:matchId', MatchesController.update);

// Admin
routes.get('/admin', accessControl('admin'), MetaController.index);

routes.use(errorHandler);

export default routes;
