module.exports=(db,type)=>{
    return db.define('entretien',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        
        Libelle:{
            type:type.STRING,
        },
    })}