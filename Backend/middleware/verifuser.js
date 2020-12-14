const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");
const { User, Role } = require('../models/relations')

module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
      
        var decoded = jwt_decode(token);
     
        const user = await User.findOne({ where: { ID: decoded.userID } })
    
        const admin = decoded.roles.find(r => r.Libelle === 'Administrateur')
        
        if ((admin !== undefined) || (user.SocieteID === null && user.ID === decoded.societeID) ||
            (user.societeID !== null && user.SocieteID === decoded.societeID)) {

            next()

        }else{
            res.status(401).json({ msg: 'vous n\'etes pas autorisé a effuctuer cette tache' })
        }

    }
    catch (error) {
        console.log(error)
        res.status(401).json({ msg: 'vous n\'etes pas autorisé a effuctuer cette tache' })
    }


}