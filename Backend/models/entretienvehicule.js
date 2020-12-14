module.exports = (db, type) => {
    return db.define('entretien_vehicule', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        DatedebutOperation: { type: type.DATE },
        DatefinOperation: { type: type.DATE },
        Montantentretien :{type:type.FLOAT},
        PieceRechange: { type: type.STRING },
        MontantPieceRechange: { type: type.FLOAT },
        MainOEuvre: { type: type.FLOAT },
        AgentEntretien: { type: type.STRING },
        KilomettrageArret: { type: type.INTEGER },
        KilomettrageLimite: { type: type.INTEGER },
        DateProchainEntretien: { type: type.DATE },
        Remarques: { type: type.STRING },
       
    })
}
