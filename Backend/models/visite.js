module.exports=(db,type)=>{
    return db.define('vistes',{
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        DateOperation: { type: type.DATE },
        DateDebutValidite: { type: type.DATE },
        DateFinValidite: { type: type.DATE },
        CopierVisite: { type: type.STRING },
        Agence: { type: type.STRING },
    
    
    })}