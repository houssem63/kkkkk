module.exports = (db, type) => {
    return db.define('entretienparvehicule', {
        ID: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    })}