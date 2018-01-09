import User from '../models/user';

export default async function  authenticate(req, res, next) {
  const userName = req.headers['fake-user-name'];
  console.log("Find fake user name from headers: " + userName);
  if (userName) {
    const openId = "openid-for-" + userName;

    try {
      var user = await User.getByOpenId(openId);
      console.log("Look for user name by openId: " + openId);
      if (!user) {
        user = new User({
          openId: openId,
          name: userName
        });

        console.log("User not found, create a new one with id: " + user._id);

        await user.save();
      }

      req.user = user;
    } catch(err) {
      next(err);
    }
  } else {
    req.user = User.anonymousUser();
  }

  console.log("Added request user with id: " + req.user._id);
  next();
}
