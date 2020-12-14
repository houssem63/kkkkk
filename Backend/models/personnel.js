module.exports=(db,type)=>{
    return db.define('personnels',{
        ID :{
            type:type.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        
        Cin:{
            type:type.STRING,
        },
        Nom:{
            type:type.STRING,
        },
        Prenom:{
            type:type.STRING,
        },
        Date_de_naissance:{
            type:type.DATE,
        },
        Adresse:{
            type:type.STRING,
        },
        Tel:{
            type:type.INTEGER,
        },
        Fax:{
            type:type.INTEGER,
        },
        Email:{
            type:type.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        NumCNSS:{
            type:type.INTEGER,
        },
        SituationFamilialle:{
            type:type.STRING,
        },
        CopierPermis:{
            type:type.STRING,
        },
    })
}