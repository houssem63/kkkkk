module.exports=(db,type)=>{
    return db.define('marquesvoitures',{
        ID :{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        Libelle :{
            type:type.STRING
        }
    })}