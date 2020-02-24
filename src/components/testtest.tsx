import React, { useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import firebase from '../services/Firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { useStore } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from 'react-router-dom';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

import { connect } from "react-redux";
import { add_data,delete_data } from "../redux/reducers/actions";

import { useDispatch,useSelector } from 'react-redux'
import { createSelector } from 'reselect'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default function Example() {
    //const todo = useSelector(state => state.DataEDT);
const history=useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [NiveauUn, setNiveauUn] = useState('');
    const [NiveauDeux, setNiveauDeux] = useState('');
    const [NiveauTrois, setNiveauTrois] = useState('');
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const store = useStore();
    let niveaudeux;
    const [value, loading, error] = useCollection(
        firebase.firestore().collection('SUPER_GROUPES'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const [valueDeux , loadingDeux, errorDeux] = useCollection(
        firebase.firestore().collection('GROUPES').where('LES_SUPER_GROUPES','array-contains',NiveauUn),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const [valueTrois , loadingTrois, errorTrois] = useCollection(
        firebase.firestore().collection('GROUPES').where('LES_SUPER_GROUPES','array-contains',NiveauDeux),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    // const DataModif = valueSeance.map(())

    const [valueSeance , loadingSeance, errorSeance] = useCollection(
        firebase.firestore().collection('Data_EDT').where('GROUPES','array-contains-any',[NiveauUn,NiveauDeux,NiveauTrois]),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );

    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);
    const GetDonnees = () => {
        dispatch({ type: 'DELETE_DATA' });

        // alert(JSON.stringify(event.target.value));
        firebase.firestore().collection('Data_EDT').where('GROUPES','array-contains-any',[NiveauUn,NiveauDeux,NiveauTrois]).get()
            .then((snapshot)=> {
                    let elements: any[] = [];
                    snapshot.forEach(doc => {
                        let date = new Date(doc.data().DateDebut);
                        let date1 = new Date(doc.data().DateFin);
                        elements.push({
                            Id: doc.id,
                            Subject: doc.data().MatiereInfoBis.NOM,
                            StartTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(),date.getHours(),date.getMinutes()),
                            EndTime: new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(),date1.getHours(),date1.getMinutes()),
                            IsAllDay: false
                        });
                    });
                    console.log("elements", elements[0]);
                    dispatch(add_data(elements));
                    console.log('storeTEST',store.getState().DataEDT);
                     history.replace('/users');

                }
            )};
        const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
            // alert(JSON.stringify(event.target.value));
            setNiveauUn(event.target.value as string);

        };
        const handleChangebis = (event: React.ChangeEvent<{ value: unknown }>) => {
            // alert(JSON.stringify(event.target.value));
            setNiveauDeux(event.target.value as string);

        };
        const handleChangeTrois = (event: React.ChangeEvent<{ value: unknown }>) => {
            // alert(JSON.stringify(event.target.value));
            setNiveauTrois(event.target.value as string);

        };

        var Itemlist: any[]=['L1','L2','L3','M1','M2'];
        const listItem= Itemlist.map((niveau)=>{
            return  <MenuItem value={niveau}>{niveau}</MenuItem>
        });
        /*
        faire la fonction directement dans le rendu
        essayer
        const dataScheduler=valueSeance.docs.map(
            (doc)=>{
                firebase.firestore().collection("ENSEIGNEMENTS").where('CODE','==',doc.data().ENSEIGNEMENT).get().then(
                    (snapshot)=>{
                        snapshot.forEach((el)=>{
                            return{
                                Id: doc.id,
                                Subject:  el.data().ALIAS,
                                StartTime: datePArser(doc.data().DATE,doc.data().HEURE),
                                EndTime: dateFin(doc.data().DATE,doc.data().HEURE,doc.data().DUREE),
                                IsAllDay: false,
                                Status: 'Completed',
                                Priority: 'High',
                                Couleur:doc.data().COULEUR
                            }
                        })

                    }
                );

            }
        ) ;
        */


        return (

            <Grid container spacing={1}  alignItems="flex-start">

                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Niveau
                        </InputLabel>


                        {value && (


                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={NiveauUn}
                                onChange={handleChange}
                                labelWidth={labelWidth}
                            >
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>
                                {value.docs.map(doc => {
                                    return  <MenuItem value={doc.data().CODE}>{doc.data().NOM}</MenuItem>
                                })}
                            </Select>
                        )}


                        {error && <strong>Error: {JSON.stringify(error)}</strong>}
                        {loading && <span>Collection: Loading...</span>}

                        {NiveauUn}
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Niveau
                        </InputLabel>


                        {valueDeux && (


                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={NiveauDeux}
                                onChange={handleChangebis}
                                labelWidth={labelWidth}
                            >
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>
                                {valueDeux.docs.map(doc => {
                                    return  <MenuItem value={doc.data().CODE}>{doc.data().NOM}</MenuItem>
                                })}
                            </Select>
                        )}


                        {errorDeux && <strong>Error: {JSON.stringify(error)}</strong>}
                        {loadingDeux && <span>Collection: Loading...</span>}
                        {NiveauDeux}
                    </FormControl>
                </Grid>
                <Grid item xs={4}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                            Niveau
                        </InputLabel>


                        {valueTrois && (


                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={NiveauTrois}
                                onChange={handleChangeTrois}
                                labelWidth={labelWidth}
                            >
                                <MenuItem value="">
                                    <em></em>
                                </MenuItem>
                                {valueTrois.docs.map(doc => {
                                    return  <MenuItem value={doc.data().CODE}>{doc.data().NOM}</MenuItem>
                                })}
                            </Select>
                        )}


                        {errorTrois && <strong>Error: {JSON.stringify(error)}</strong>}
                        {loadingTrois && <span>Collection: Loading...</span>}
                        {NiveauTrois}

                    </FormControl>
                </Grid>
                <Grid item   direction="row"
                      justify="center"
                      alignItems="center"
                      xs={12}>

                        <Button variant="contained" color="primary" onClick={GetDonnees}>
                            Valider
                        </Button>

                </Grid>
                {valueSeance && (

                    <ul>
                        {valueSeance.docs.map(doc => {
                            return  <li >{doc.data().MatiereInfoBis.NOM}//
                                {doc.data().SalleInfo.Nom}//{doc.data().ZoneInfo.NOM}//{doc.data().TypeActivite.ALIAS}
                            </li>
                        })}
                    </ul>
                )}


                {/*   <ScheduleComponent workHours={{
        highlight: true, start: '8:00', end: '19:00'
    }}>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>*/}

            </Grid>

        );
    }

    function datePArser(date:string,heure:string) {
        if (heure.length===3) {
            heure = '0' + heure;
        }
        let VarSplit=date.split('-');
        let DateDebut=  new Date(parseInt(VarSplit[0]),parseInt(VarSplit[1])-1,parseInt(VarSplit[2]), parseInt(heure[0]+heure[1]), parseInt(heure[2]+heure[3])).toString();
        return DateDebut;
        // console.log(date + '  ' + heure);

//return true
    }
    function dateFin(date:string,heure:string,min:string) {
        if (heure.length===3) {
            heure = '0' + heure;
        }
        let VarSplit=date.split('-');
        let DateDebut=  new Date(parseInt(VarSplit[0]),parseInt(VarSplit[1])-1,parseInt(VarSplit[2]), parseInt(heure[0]+heure[1]), parseInt(heure[2]+heure[3]));
        let DateFin=add_minutes(DateDebut,parseInt(min)).toString();
        return DateFin;

    }

    var add_minutes =  function (dt:Date, minutes:number) {
        return new Date(dt.getTime() + minutes*60000);
    };

