module.exports=(db,type)=>{
    return db.define('users',{
        ID:{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
       
        Rs:{
            type:type.STRING
        },
        Adresse:{
            type:type.STRING
        },
        Tel:{
            type:type.INTEGER
        },
        Fax:{
            type:type.INTEGER
        },
        Email:{
            type:type.STRING,
            allowNull: false,
            
            
            isEmail: true, 
        },
        Site:{
            type:type.STRING
        },
        Matfiscale :{
            type:type.STRING
        },
        Image:{
            type:type.STRING
        },
        MotDePasse:{
            type:type.STRING
        },
        Status:{
            type:type.BOOLEAN
        },
        DateExpiration:{
            type:type.DATE
        },Login:{
            type:type.STRING
        },Cin:{
            type:type.INTEGER,
        },Nom:{
            type:type.STRING,
        },
        Prenom:{
            type:type.STRING,
        },
        DateDeNaissance:{
            type:type.DATE,
        },  NumCNSS:{
            type:type.INTEGER,
        },
        SituationFamilialle:{
            type:type.STRING,
        },
        CopierPermis:{
            type:type.STRING,
        }, Rs:{
            type:type.STRING
        }, NomPC:{
            type:type.STRING
        },
        PrenomPC:{
            type:type.STRING
        },
        TelPersonnelContact:{
            type:type.INTEGER
        },
        FaxPersonnelContact:{
            type:type.INTEGER
        },
        AdresseEmailPersonnel:{
            type:type.STRING,
            isEmail: true
        },
       
        Regfiscale:{
            type:type.INTEGER
        },
      
        SocieteID:{type:type.INTEGER},
        Dernierconnection :{type:type.DATE},
        HasActivity :{type:type.BOOLEAN}


    })
}