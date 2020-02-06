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

var serviceAccount = require("../vt-agenda-firebase-adminsdk-bmgkj-bdf929fafe");
var grade=require('../JSON/grade.json');
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
    SuperGroupe();
};

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
              //Groupes(document.data().CODE);
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
    db.collection("SEANCES").where('LES_RESSOURCES.UNE_RESSO','==','GROUPE').limit(10).get().then(
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

async function ObjetSeance() {
//    var tabResult = [];
     db.collection("SEANCES")
        //.where('LES_RESSOURCES.UNE_RESSO', '==', 'GROUPE')
        .limit(1)
        .get()

        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                console.log(doc.data().LES_RESSOURCES.UNE_RESSOURCE.filter((el)=> el.TYPE==='GROUPE')[0].CODE_RESSOURCE);
            })
        });

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