module.exports=(db,type)=>{
    return db.define('modepaiments',{
        ID :{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        Libelle :{
            type:type.STRING
        }
    })}