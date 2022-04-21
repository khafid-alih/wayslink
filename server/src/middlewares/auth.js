const jwt = require('jsonwebtoken');
const { user } = require('../../models');

module.exports = {
  auth: async (req, res, next) => {

    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).send({
        message: "Access denied!"
      })
    }

    try {
      const SECRRET_KEY = process.env.SECRET_KEY
      const verified = jwt.verify(token, SECRRET_KEY)

      const userExist = await user.findOne({
        where : {
          id: verified.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        }
      })

      req.user = { 
        id: verified.id, 
        iat: verified.iat
      }

      next()
    }catch(error){
        res.status(400).send({
          message: "Invalid token!"
        })
    }
  }
}
