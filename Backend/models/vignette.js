module.exports=(db,type)=>{
    return db.define('vignettes',{
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        DateOperation: { type: type.DATE },
        DateDebutValidite: { type: type.DATE },
        DateFinValidite: { type: type.DATE },
        CopierVignette: { type: type.STRING },
    
    
    })}