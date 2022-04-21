const { user } = require("../../models")

module.exports = {
  getUser: async (req, res)=>{
    try {
        const { id } = req.user;
    
        const data = await user.findOne({
            where: {
                id,
            },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
        })
    
        res.send({
            status: "success",
            data: {
                user: data,
            },
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
  },
  getUsers: async (req, res)=>{
    try {
    
        const data = await user.findAll({
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
        })
    
        res.send({
            status: "success",
            data: {
                user: data,
            },
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
  },
  deleteUser: async (req, res)=>{
    try {
      const { id } = req.user

      await user.destroy({
        where: {
          id 
        }
      })

      res.send({
        status: 'success'
      })
    } catch (error) {
      console.log(error);
      res.send(error)
    }
  }
}