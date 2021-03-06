import BaseController from './base.controller';
import User from '../models/user';

class UsersController extends BaseController {
  searchUser = async (req, res, next) => {
    const q = req.query.q;

    try {
      if (!q) {
        res.json(await User.find());
      } else {
        res.json(await User.find({'name': q}));
      }
    } catch(err) {
      next(err);
    }
  }

  get = async (req, res, next) => {
    const userId = req.params.userId;

    try {
      res.json(await User.findById(userId));
    } catch(err) {
      next(err);
    }
  }

  update = async (req, res, next) => {
    res.json({ message: "Not implemented yet" });
  }

  login = async (req, res, next) => {
    // TODO: fake login
    res.json(User.anonymousUser());
  }

  whoami = async (req, res, next) => {
    res.json(req.user);
  }
}

export default new UsersController();
