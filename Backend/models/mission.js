module.exports=(db,type)=>{
    return db.define('missions',{
        ID :{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
      Depart:{
          type:type.STRING
      },
      Destination:{
        type:type.STRING
    },
      Compteur:{
        type:type.INTEGER
    },
    DateHeureDepart:{
        type:type.DATE
    },
    DateHeureArriver:{
        type:type.DATE
    },
    Prixunitaire:{
        type:type.FLOAT
    },
    MontantFrais:{
        type:type.FLOAT
    },

    })}