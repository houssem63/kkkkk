
module.exports=(db,type)=>{
    return db.define('detailchargevehicule',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        ReferancePiece:{
            type:type.STRING
        },
        Montant:{
            type:type.REAL,
        },
        Echeance:{
            type:type.STRING
        },
        DateOperation:{
            type:type.DATE
        },
        DatePaiementEffectif:{
            type:type.DATE
        }
    })}