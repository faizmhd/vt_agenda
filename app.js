const express=require('express');
const app=express();
const router=express.Router();
const PORT = process.env.PORT || 2000
// pour middleware app.use
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
app.route('/Accueil')
    .get()
    .post()
    .delete();
app.route('/SuperGroupe')
    .get()
    .post()
    .delete();
app.route('/Groupe')
    .get()
    .post()
    .delete();
app.route('/Agenda')
    .get()
    .post()
    .delete();

app.all('/test');

var admin = require("firebase-admin");

var serviceAccount = require("./vt-agenda-firebase-adminsdk-bmgkj-bdf929fafe");
//var grade=require('../JSON/grade.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://vt-agenda.firebaseio.com"
});
let db = admin.firestore();
main();
function main(){
  //console.log(SuperGroupe());
    //ObjetSeance();
   // SeancesGroupes('15824368');
   /* superGroupe.forEach((el)=>{
          console.log(el);
          Groupes(el.data().CODE);
      });
*/
   //Groupes('15824275');
    //SuperGroupe();
   // NonSuperGroupes();
   // SeancesFormat();
    //EnseignementFormat();

     //calendrierData1();
    //calendrierDataProfInfo();//fait
    //calendrierDataSalleInfo();//fait
   // calendrierDataEnseignementInfo(); //fait
   // calendrierDataMatiereInfo();//fait
    //calendrierDataZoneInfo(); //fait
   // HoraireCours(); fait
    //AjoutTypeActivite(); fait
   // AjoutNomActivite(); fait
};
//EDT par salle Zone>Salle>DATA EDT
//EDT par PROF
function AjoutNomActivite() {
    db.collection("Data_EDT")
        //.limit(1)
        .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
                // console.log('1');
                db.collection("Data_EDT").doc(doc.id).update({
                    //ProfIdentite:admin.firestore.FieldValue.arrayRemove()
                    TypeActivite:""
                }).then(()=>{
                    db.collection("TYPES_ACTIVITES").where("CODE","==",doc.data().CodeActivite)
                        //.limit(1)
                        .get().then(
                        snapshotbis=>{
                            //console.log('2');
                            snapshotbis.forEach((el)=>{
                                // console.log(el.data());

                                db.collection("Data_EDT").doc(doc.id).update({
                                    //ajouter a la liste des profs
                                    //ne pas ajouter que le dernier prof
                                    TypeActivite:{
                                        NOM:el.data().NOM,
                                        ALIAS:el.data().ALIAS
                                    }

                                });
                            });
                        }
                    );
                })
            });
        }
    );
};
function AjoutTypeActivite() {
    db.collection("Data_EDT")
        //.limit(1)
        .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
                // console.log('1');
                db.collection("Data_EDT").doc(doc.id).update({
                    //ProfIdentite:admin.firestore.FieldValue.arrayRemove()
                    CodeActivite:""
                }).then(()=>{
                    db.collection("ENSEIGNEMENTS").where("CODE","==",doc.data().ENSEIGNEMENT)
                        //.limit(1)
                        .get().then(
                        snapshotbis=>{
                            //console.log('2');
                            snapshotbis.forEach((el)=>{
                                // console.log(el.data());

                                db.collection("Data_EDT").doc(doc.id).update({
                                    //ajouter a la liste des profs
                                    //ne pas ajouter que le dernier prof
                                    CodeActivite:el.data().TYPE_ACTIVITE

                                });
                            });
                        }
                    );
                })
            });
        }
    );
};
function HoraireCours(){
    db.collection("Data_EDT")
        //.limit(1)
        .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
                // console.log('1');
                db.collection("Data_EDT").doc(doc.id).update({
                    DateDebut:datePArser(doc.data().DATE,doc.data().HEURE),
                    DateFin:dateFin(doc.data().DATE,doc.data().HEURE,doc.data().DUREE)
                })
            });
        }
    );
}


function calendrierDataZoneInfo(){
    db.collection("Data_EDT")
        //.limit(1)
         .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
               // console.log('1');
                db.collection("Data_EDT").doc(doc.id).update({
                    //ProfIdentite:admin.firestore.FieldValue.arrayRemove()
                    ZoneInfo:""
                }).then(()=>{
                    db.collection("ZONES_DE_SALLES").where("CODE","==",doc.data().SalleInfo.CODE_ZONE)
                        //.limit(1)
                    .get().then(
                        snapshotbis=>{
                            //console.log('2');
                            snapshotbis.forEach((el)=>{
                                // console.log(el.data());

                                db.collection("Data_EDT").doc(doc.id).update({
                                    //ajouter a la liste des profs
                                    //ne pas ajouter que le dernier prof
                                    ZoneInfo:/*...doc.data().SalleInfo,*/{
                                        NOM:el.data().NOM
                                    }
                                });
                            });
                        }
                    );
                })
            });
        }
    );
}

function calendrierDataMatiereInfo(){
    db.collection("Data_EDT")
        //.limit(1)
        .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
               // console.log('1');
                db.collection("Data_EDT").doc(doc.id).update({
                    //ProfIdentite:admin.firestore.FieldValue.arrayRemove()
                    MatiereInfoBis:[]
                }).then(()=>{
                    db.collection("MATIERES").where("CODE","==",doc.data().EnseignementInfo[0].CODE_MATIERE)
                        //.limit(1)
                    .get().then(
                        snapshotbis=>{
                          //  console.log('2');
                            snapshotbis.forEach((el)=>{
                                // console.log(el.data());

                                db.collection("Data_EDT").doc(doc.id).update({
                                    //ajouter a la liste des profs
                                    //ne pas ajouter que le dernier prof
                                    MatiereInfoBis:{
                                        NOM:el.data().NOM,
                                        ALIAS:el.data().ALIAS
                                    }
                                });
                            });
                        }
                    );
                })
            });
        }
    );
}

function calendrierData1() {
    //
    db.collection("SEANCES")
       // .limit(1)
        .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("Data_EDT").doc().up({
                    GROUPES: doc.data().GROUPE,
                    PROF: doc.data().PROF,
                    SALLE: doc.data().SALLE,
                    DATE: doc.data().DATE,
                    HEURE: doc.data().HEURE,
                    DUREE: doc.data().DUREE,
                    ENSEIGNEMENT:doc.data().ENSEIGNEMENT
                })
            })
        }
    )
};
function calendrierDataEnseignementInfo(){
    db.collection("Data_EDT").get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
                console.log('1');
                db.collection("Data_EDT").doc(doc.id).update({
                    //ProfIdentite:admin.firestore.FieldValue.arrayRemove()
                    EnseignementInfo:[]
                }).then(()=>{
                    db.collection("ENSEIGNEMENTS").where("CODE","==",doc.data().ENSEIGNEMENT)

                        .get().then(
                        snapshotbis=>{
                            console.log('2');
                            snapshotbis.forEach((el)=>{
                                // console.log(el.data());

                                db.collection("Data_EDT").doc(doc.id).update({
                                    //ajouter a la liste des profs
                                    //ne pas ajouter que le dernier prof
                                    EnseignementInfo:[/*...doc.data().SalleInfo,*/{
                                        CODE_MATIERE:el.data().CODE_MATIERE,
                                        NOM:el.data().NOM
                                    }]
                                });
                            });
                        }
                    );
                })
            });
        }
    );
}



function calendrierDataSalleInfo(){
    db.collection("Data_EDT")
        //.limit(1)
        .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("Data_EDT").doc(doc.id).update({
                    //ProfIdentite:admin.firestore.FieldValue.arrayRemove()
                    SalleInfo:""
                }).then(()=>{
                    db.collection("SALLES").where("CODE","==",doc.data().SALLE)
                        //.limit(1)
                    .get().then(
                        snapshotbis=>{

                            snapshotbis.forEach((el)=>{
                                // console.log(el.data());

                                db.collection("Data_EDT").doc(doc.id).update({
                                    //ajouter a la liste des profs
                                    //ne pas ajouter que le dernier prof
                                    SalleInfo:{
                                        ALIAS:el.data().ALIAS,
                                        Nom:el.data().NOM,
                                        CODE_ZONE:el.data().CODE_ZONE
                                    }
                                });
                            });
                        }
                    );
                })
            });
        }
    );
}

function calendrierDataProfInfo() {
    db.collection("Data_EDT")

        .get().then(
        (snapshot) => {
            snapshot.forEach((doc) => {
               // console.log('1');
                db.collection("Data_EDT").doc(doc.id).update({
                    //ProfIdentite:admin.firestore.FieldValue.arrayRemove()

                    ProfIdentite:[]
                }).then(()=>{
                    db.collection("PROFESSEURS").where("CODE","==",doc.data().PROF[0])
                        //.limit(1)
                        .get().then(
                        snapshotbis=>{
                           // console.log('2');
                            snapshotbis.forEach((el)=>{
                                // console.log(el.data());

                                db.collection("Data_EDT").doc(doc.id).update({
                                    //ajouter a la liste des profs
                                    //ne pas ajouter que le dernier prof
                                    ProfIdentite:[...doc.data().ProfIdentite,{
                                        Nom:el.data().NOM,
                                        Prenom:el.data().PRENOM
                                    }]
                                });
                            });
                        }
                    );
                })
            });
        }
    )
};
function EnseignementFormat() {
    db.collection("ENSEIGNEMENTS").limit(1).get().then(
        (snapshot)=>{
            snapshot.forEach((document)=>{
                try {

                        db.collection("ENSEIGNEMENTS").doc(document.id).update({
                            GROUPE: document.data().LES_RESSOURCES.UNE_RESSOURCE.filter((el) => {
                                return el.TYPE === 'GROUPE';
                            }).map((el)=>{
                                return el.CODE_RESSOURCE
                            })
                        })

                }catch(err){
                   // console.log(document.data());
                }
                //console.log(document.data().LES_RESSOURCES.UNE_RESSOURCE!==undefined);
             /*   if(document.data().LES_RESSOURCES.UNE_RESSOURCE!==undefined) {
                    db.collection("ENSEIGNEMENTS").doc(document.id).update({
                        GROUPE: document.data().LES_RESSOURCES.UNE_RESSOURCE.filter((el) => {
                            return el.TYPE === 'GROUPE';
                        })
                    })
                } */
            })
        }

    )
}






function SeancesFormat() {
    db.collection("SEANCES").get().then(
        snapshot=>{
            snapshot.forEach(document=>{

               db.collection("SEANCES").doc(document.id).update(
                    {
                        PROF:document.data().LES_RESSOURCES.filter((el)=>{
                            return el.TYPE==='PROF'
                        }).map((el)=>{
                            return el.CODE_RESSOURCE
                        }),
                        SALLE:document.data().LES_RESSOURCES.filter((el)=>{
                            return el.TYPE ==='SALLE';
                        }).map((el)=>{
                            return el.CODE_RESSOURCE
                        }),
                        GROUPE:document.data().LES_RESSOURCES.filter((el)=>{
                            return el.TYPE ==='GROUPE';
                        }).map((el)=>{
                            return el.CODE_RESSOURCE
                        })
                    }
                )
            });

            console.log('fin');
        }

    );

}

function NonSuperGroupes() {
    var tabResult=[];
    db.collection("GROUPES").get().then(
        snapshot=>{
            snapshot.forEach(document=>{
                if (document.data().LES_SUPER_GROUPES!==undefined){
                    tabResult.push({
                        ID:document.id,
                        Tab:document.data().LES_SUPER_GROUPES.UN_CODE_SUPER_GROUPE
                    });
                };
            });


             tabResult.forEach((el)=>{
                 db.collection("GROUPES").doc(el.ID).update(
                     {
                         LES_SUPER_GROUPES:el.Tab
                     }
                 )
             });
             console.log('fin');
        }

    );

}
function SuperGroupe() {
    var tabResult=[];
  db.collection("GROUPES").get().then(
      snapshot=>{
          snapshot.forEach(document=>{
              if (document.data().LES_SUPER_GROUPES===undefined){
                  tabResult.push(document);
              };
          });
          tabResult.forEach(document =>{
              console.log(document.data().NOM+'  '+document.data().CODE);
              db.collection('SUPER_GROUPES').doc().set(document.data());
          });
      }

    );
//return tabResult;
  // while (query===undefined);
}

function Groupes(SG) {
    var tabResult=[];
    db.collection("GROUPES").get().then(
        snapshot=>{
            snapshot.forEach(document=>{
                if (document.data().LES_SUPER_GROUPES!==undefined){
                    tabResult.push(document);
                };
            });
            var GroupesFinal=tabResult.reduce((acc,currentValue)=>{
              // console.log(currentValue.data().LES_SUPER_GROUPES.UN_CODE_SUPER_GROUPE.includes(SG)+'==='+SG);
                if (currentValue.data().LES_SUPER_GROUPES.UN_CODE_SUPER_GROUPE.includes(SG)){
                    acc.push(currentValue.data().NOM);

                }
                return acc
            },[]);
            console.log(GroupesFinal);
            return GroupesFinal;
        }

    );

}
//limit les get
//utiliser with converter pour remettre les array aux premier niveau
function SeancesGroupes(CG){
    var tabResult=[];
    db.collection("SEANCES").where('LES_RESSOURCES','==','GROUPE').limit(10).get().then(
        snapshot=>{
            snapshot.forEach(doc => {

                if (doc.data().LES_RESSOURCES.UNE_RESSOURCE.some(el=>{
                    return el.TYPE==='GROUPE' && el.CODE_RESSOURCE===CG
                })){
                    tabResult.push(doc);
                }

            })
            console.log(tabResult);
            //map du tableau recuperé pour l'adapter au calendrier
        }
    )
}

function datePArser(date,heure) {
    if (heure.length===3) {
        heure = '0' + heure;
    }
    let VarSplit=date.split('-');
    let DateDebut=  new Date(parseInt(VarSplit[0]),parseInt(VarSplit[1])-1,parseInt(VarSplit[2]), parseInt(heure[0]+heure[1]), parseInt(heure[2]+heure[3])).toString();
    return DateDebut;
    // console.log(date + '  ' + heure);

//return true
}
function dateFin(date,heure,min) {
    if (heure.length===3) {
        heure = '0' + heure;
    }
    let VarSplit=date.split('-');
    let DateDebut=  new Date(parseInt(VarSplit[0]),parseInt(VarSplit[1])-1,parseInt(VarSplit[2]), parseInt(heure[0]+heure[1]), parseInt(heure[2]+heure[3]));
    let DateFin=add_minutes(DateDebut,parseInt(min)).toString();
    return DateFin;

}

var add_minutes =  function (dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
}

//let CollectionName;

//let JsonName=require('./vt_agenda/json/enseignement.json');

//db.collection('COMPOSANTE').doc().set(JsonName.LES_COMPOSANTES);
/*
JsonName.LES_ENSEIGNEMENTS.UN_ENSEIGNEMENT.forEach((item)=>{
    db.collection('ENSEIGNEMENTS').doc().set(item);
})

console.log('fin');

console.log(db.collection("PROFESSEURS").orderBy('NOM','desc').where('TITULAIRE','==','1').get())
*/
//app.listen(PORT, function () {
 //   console.log('Example app listening on port 2000!');
//})