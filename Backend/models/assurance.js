module.exports = (db, type) => {
    return db.define('assurances', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        DateOperation: { type: type.DATE },
        DateDebutValidite: { type: type.DATE },
        DateFinValidite: { type: type.DATE },
        CopierAssurance: { type: type.STRING },
        Montant: { type: type.FLOAT },
    })
}