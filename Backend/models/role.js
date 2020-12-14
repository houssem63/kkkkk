
module.exports=(db,type)=>{
    return db.define('roles',{
        ID :{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        Libelle :{type:type.STRING},
        Poids :{type:type.INTEGER}
        
    })
}
