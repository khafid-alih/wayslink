const { user, mainLink, link } = require("../../models")

const crypto = require('crypto')

module.exports = {
  getMyLink: async (req, res)=>{
    try {
        const { id } = req.user;
    
        const data = await mainLink.findAll({
            where: {
                idUser : id,
            },
            attributes: {
                exclude: [ "createdAt", "updatedAt"],
            },
        })
    
        res.send({
            status: "success",
            data: data,
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
  },
  getLink: async (req, res)=>{
    try {
      const { uniq, id } = req.params
    
        const data = await mainLink.findOne({
            where: {
                id,
                linkName : uniq
            },
            include: {
              model: link,
              as: "links",
              attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
              },
          },
            attributes: {
                exclude: [ "createdAt", "updatedAt"],
            },
        })
    
        res.send({
            status: "success",
            data: data,
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
  },
  addLink: async (req, res)=>{
    try {
        const { ...data } = req.body
        const { templateId } = req.params;
        const file = req.files
        const newLinks = []

        const uniqLink = crypto.randomBytes(8).toString('hex');

        await mainLink.create({
          idUser: req.user.id,
          title: data.title,
          linkName: uniqLink,
          describtion: data.describtion,
          image: file.mainLinkImage[0].filename,
          templateId: 0,
          viewCount: 0
        });

        const newMainLink = await mainLink.findOne({
          where: {
            linkName: uniqLink,
            idUser: req.user.id,
            title: data.title,
          }
        });

        newLinks.push({
          idMainLink: newMainLink.id,
          titleLink: data.title1,
          link: data.link1,
          image: file.linkImage1[0].filename
        })
        newLinks.push({
          idMainLink: newMainLink.id,
          titleLink: data.title2,
          link: data.link2,
          image: file.linkImage2[0].filename
        })

        if(data.index0){
          newLinks.push({
            idMainLink: newMainLink.id,
            titleLink: data.title3,
            link: data.link3,
            image: file.linkImage3[0].filename
          })
        }
        if(data.index1){
          newLinks.push({
            idMainLink: newMainLink.id,
            titleLink: data.title4,
            link: data.link4,
            image: file.linkImage4[0].filename
          })
        }
        if(data.index2){
          newLinks.push({
            idMainLink: newMainLink.id,
            titleLink: data.title5,
            link: data.link5,
            image: file.linkImage5[0].filename
          })
        }

        let i = 0
        while(i < newLinks.length){
          await link.create(newLinks[i]);
          i++
        }

        res.send({
          status: "ada",
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        })
    }
  },
  updateViewerLink: async (req, res)=>{
    try {
        const { id } = req.params;

        const data = await mainLink.findOne({
          where: {
              id
          }
        })

        await mainLink.update({
            viewCount: data.viewCount + 1
        }, {
            where: {
                id,
            },
        })

    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
  },
  deleteLink: async (req, res)=>{
    try {
        const { id } = req.params;
    
        await mainLink.destroy({
            where: {
                id,
            },
        })
    
    } catch (error) {
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
  }  
}