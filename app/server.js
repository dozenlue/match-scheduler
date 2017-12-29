import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';

import MetaController from './controllers/meta.controller';
import UsersController from './controllers/users.controller';
import LeaguesController from './controllers/leagues.controller';
import MatchesController from './controllers/matches.controller';

import Constants from './constants';

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());

// Request logger
// https://github.com/expressjs/morgan
if (!Constants.envs.test) {
  app.use(morgan('dev'));
}

// Parse incoming request bodies
// https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Lets you use HTTP verbs such as PUT or DELETE
// https://github.com/expressjs/method-override
app.use(methodOverride());

// Mount public routes
app.use('/public', express.static(`${__dirname}/public`));

// Mount API routes
app.get('/', MetaController.index);

// Users API
app.get('/users', UsersController.searchUser);
app.get('/users/:userId', UsersController.get);
app.put('/users/:userId', UsersController.update);

// Authenticate API
app.get('/auth/login', UsersController.login);
app.get('/auth/whoami', UsersController.whoami);

// Leagues/Matches API
app.get('/leagues', LeaguesController.list);
app.post('/leagues', LeaguesController.create);
app.get('/leagues/:leagueId', LeaguesController.get);
app.put('/leagues/:leagueId', LeaguesController.update);
app.get('/leagues/:leagueId/registeredPlayers', LeaguesController.listRegisteredPlayers);
app.post('/leagues/:leagueId/registeredPlayers', LeaguesController.registerPlayer);
app.get('/leagues/:leagueId/players', LeaguesController.listPlayers);
app.post('/leagues/:leagueId/players', LeaguesController.addPlayer);
app.delete('/leagues/:leagueId/players/:playerId', LeaguesController.removePlayer);

app.get('/leagues/:leagueId/matches', MatchesController.listLeagueMatches);
app.get('/leagues/:leagueId/matches/:matchId', MatchesController.get);
app.put('/leagues/:leagueId/matches/:matchId', MatchesController.update);

app.listen(Constants.port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    Port: ${Constants.port}
    Env: ${app.get('env')}
  `);
});

export default app;
