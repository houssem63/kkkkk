module.exports=(db,type)=>{
    return db.define('user_roles',{
        ID :{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        }
       
       
    })
}
