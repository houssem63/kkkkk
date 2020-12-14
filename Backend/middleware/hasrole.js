const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode");
const { User, Role } = require('../models/relations')

const hasrole=(role,token)=>{

    var decoded = jwt_decode(token);
      return decoded.roles.findIndex((r) => r.Libelle === role) !== -1;


}
var decodetoken=(token)=>{

    return jwt_decode(token);
}


module.exports = {
    hasrole,
    decodetoken
}

