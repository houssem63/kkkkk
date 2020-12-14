module.exports = (db, type) => {
    return db.define('abonnements', {

        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        DateDebut :{
            type:type.DATE
        },
        DateFin :{
            type:type.DATE
        },
        Montant :{
            type:type.REAL
        },
        Duree:{
            type:type.INTEGER
        },
        AdminID:{
            type:type.INTEGER
        },
     

    })}