module.exports=(db,type)=>{
    return db.define('banques',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        
        libelle:{
            type:type.STRING,
        }
    })
}