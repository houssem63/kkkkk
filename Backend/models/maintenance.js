module.exports=(db,type)=>{
    return db.define('maintenances',{
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        DateOperation: { type: type.DATE },
        DateDebutMaintenance: { type: type.DATE },
        DateFinMaintenance: { type: type.DATE },
        MainOEuvre: { type: type.REAL },
        MontantPieceRecharge: { type: type.REAL },
        AgentMaintenance: { type: type.STRING },
PieceRechange: { type: type.STRING },
    
    })}