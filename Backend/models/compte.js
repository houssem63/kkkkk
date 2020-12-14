module.exports=(db,type)=>{
    return db.define('compte',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        RIB:{
            type:type.STRING
        }
    
    })
}