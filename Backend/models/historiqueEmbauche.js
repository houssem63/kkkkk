module.exports=(db,type)=>{
    return db.define('historiqueEmbauches',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        DateEmbauche:{
            type:type.DATE
        },
        DateSortie:{
            type:type.DATE
        },
        Salaire:{
            type:type.REAL
        },
        SocieteID:{
            type:type.INTEGER
        }
        
    })
}