const { user } = require('../../models')

const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    register: async (req, res)=>{
        const schema = Joi.object({
            fullName: Joi.string().min(6).required(),
            email: Joi.string().email().min(5).required(),
            password: Joi.string().min(1).required(),
        })
        
        const { error } = schema.validate(req.body)
        
        if(error){
            return res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
            })
        }
        
        try{
            console.log(req.body);
            const { fullName, email, password } = req.body

            const userExist = await user.findOne({
                where: {
                    email
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })

            if(userExist){
                if(userExist.email == email){
                    return res.status(400).send({
                        status: "failed",
                        message: "Already Exsist",
                    })
                }
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
        
            await user.create({
                fullName: fullName,
                email: email,
                password: hashedPassword,
            })
        
            res.status(200).send({
              status: "success"
            })

        }catch (error) {
          console.log(error);
            res.status(500).send({
                status: "failed",
                message: "Server Error",
            });
        }
    },
    login: async (req, res)=>{
        const schema = Joi.object({
            email: Joi.string().email().min(6).required(),
            password: Joi.string().min(1).required(),
        })
        
        const { error } = schema.validate(req.body);
        
        if (error)
            return res.status(400).send({
                error: {
                    message: error.details[0].message,
                },
        })
        
        try {
            const userExist = await user.findOne({
                where: {
                    email: req.body.email,
                },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            })

            if(userExist){
                const isValid = await bcrypt.compare(req.body.password, userExist.password)
        
                if (!isValid) {
                    return res.status(400).send({
                        status: "failed",
                        message: "credential is invalid",
                    })
                }
            
                const token = jwt.sign({ id: userExist.id }, process.env.SECRET_KEY)

                const data = {
                    name: userExist.fullName,
                    email: userExist.email,
                    token
                }

                res.status(200).send({
                    status: "success",
                    data: data,
                })
            }else{
                return res.status(400).send({
                    status: "failed",
                    message: "user not found",
                })
            }
          } catch (error) {
              console.log(error);
            res.status(500).send({
                status: "failed",
                message: "Server Error",
            })
          }
    },
    checkAuth : async (req, res) => {
        try {
          const id = req.user.id;
      
          const dataUser = await user.findOne({
            where: {
              id,
            },
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          });
      
          if (!dataUser) {
            return res.status(404).send({
              status: "failed",
            });
          }

          res.send({
            status: "success",
            data: {
              user: {
                id: dataUser.id,
              },
            },
          });
        } catch (error) {
          res.status({
            status: "failed",
            message: "Server Error",
          });
        }
    }
}