module.exports=(db,type)=>{
    return db.define('ResetToken',{
        ID :{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        mail:{ type:type.STRING},
        token: { type:type.STRING},
        expiration: {type:type.DATE},
        used: {type:type.BOOLEAN}
        
    })
}
