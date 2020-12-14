module.exports = (db, type) => {
    return db.define('prestataireassurances', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },  Libelle: { type: type.STRING },
        Tel: { type: type.INTEGER },
       
        Site: { type: type.STRING },
      
        Adresse: { type: type.STRING },
    })
}