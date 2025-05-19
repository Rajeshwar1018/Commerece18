const UserService = require('../service/UserService')

class UserController {

    async register(req,res) {
        try {
            const user = await UserService.register(req.body);
            return res.status(200).json({
                data: user
            });
          } catch (error) {
            return res.status(500).json({
                message: "Error in creating User",
                error: error,
              });
          }
    }

    async login(req,res) {
        try {
            const user = await UserService.login(req.body.email,req.body.password);
            return res.status(200).json({
                data: user
            });
          } catch (error) {
            return res.status(500).json({
                message: "Error in login ",
                error: error,
              });
          }

    }
}

module.exports = new UserController()