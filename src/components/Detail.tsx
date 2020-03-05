import React, {Component, ReactDOM, useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { useStore } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    Redirect
} from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface ColumnDetail {
    id: 'Date' | 'Semaine' | 'Groupe' | 'Type' | 'Enseignement'|'Prof'|'HeureDebut'|'Duree'|'Effectuee';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
interface DataD {
    Date: string;
    Semaine: number;
    Groupe: string;
    Type: string;
    Enseignement: string;
    Prof: string;
    HeureDebut: string;
    Duree: string;
    Effectuee: string;
}
function createDataD(Date: string, Semaine: number, Groupe: string, Type: string,
                     Enseignement: string,Prof: string,HeureDebut: string
    ,Duree: string,Effectuee: string): DataD {
    return {Date ,Semaine , Groupe , Type , Enseignement,Prof,HeureDebut,Duree,Effectuee };
}
const rowsDetail=[createDataD('C1',2,'C2','C3','C4','C5','C6','C7','C8'),
    createDataD('C1',2,'C2','C3','C4','C5','C6','C7','C8'),
    createDataD('C1',2,'C2','C3','C4','C5','C6','C7','C8'),
    createDataD('C1',2,'C2','C3','C4','C5','C6','C7','C8'),
    createDataD('C1',2,'C2','C3','C4','C5','C6','C7','C8'),
    createDataD('C1',2,'C2','C3','C4','C5','C6','C7','C8'),
    createDataD('C1',2,'C2','C3','C4','C5','C6','C7','C8')];

const columnsDetail: ColumnDetail[] = [
    { id: 'Date', label: 'Date', minWidth: 170 },
    { id: 'Semaine', label: 'Semaine', minWidth: 100 , align: 'right',
        format: (value: number) => value.toLocaleString()},
    {
        id: 'Groupe',
        label: 'Groupe',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'Type',
        label: 'Type',
        minWidth: 170,
        align: 'right',

    },
    {
        id: 'Enseignement',
        label: 'Enseignement',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'Prof',
        label: 'Prof',
        minWidth: 170,
        align: 'right',
    },

    {
        id: 'HeureDebut',
        label: 'Heure Debut',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'Duree',
        label: 'Duree',
        minWidth: 170,
        align: 'right',
    },
    {
        id: 'Effectuee',
        label: 'Effectuee',
        minWidth: 170,
        align: 'right',
    }
];

const columns: Column[] = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString(),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString(),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toFixed(2),
    },
];

interface Data {
    name: string;
    code: string;
    population: number;
    size: number;
    density: number;
}

function createData(name: string, code: string, population: number, size: number): Data {
    const density = population / size;
    return { name, code, population, size, density };
}


const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];


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
const useStylesTab = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});
export default function EDT() {
    const classes = useStyles();
    const classesTab = useStylesTab();
    const [age, setAge] = React.useState('');
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} >
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                        Age
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={age}
                        onChange={handleChange}
                        labelWidth={labelWidth}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Paper className={classesTab.root}>
                <TableContainer className={classesTab.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columnsDetail.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsDetail.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Semaine+row.Date}>
                                        {columnsDetail.map(column => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>

    );
}
