module.exports=(db,type)=>{
    return db.define('postes',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        
        Libelle:{
            type:type.STRING
        }
    })
}