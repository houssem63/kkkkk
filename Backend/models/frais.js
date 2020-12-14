module.exports = (db, type) => {
    return db.define('frais', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
       
        Libelle: { type: type.STRING },
     Montant:{ type: type.FLOAT },
        Type: { type: type.STRING },
       
    })
}