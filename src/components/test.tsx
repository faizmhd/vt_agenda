import  React,{Component,useState,useRef,useEffect,ChangeEvent} from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

const classes = useStyles();
const [age, setAge] =useState('');
const inputLabel = useRef<HTMLLabelElement>(null);
const [labelWidth, setLabelWidth] =useState(0);





class Test extends Component {
    constructor(props:any) {
        super(props);
        this.state = {
            age,
            labelWidth,
            setLabelWidth
        };
        this.useEffect =  this.useEffect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange = (event: ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    useEffect=(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
});

render() {

        return (
<div>
    <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
            Niveau
        </InputLabel>
        <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={this.age}
            onChange={this.handleChange}
            labelWidth={this.labelWidth}
        >
            <MenuItem value="">
                <em></em>
            </MenuItem>
            <MenuItem value={'L1'}>L1</MenuItem>
            <MenuItem value={'L2'}>L2</MenuItem>
            <MenuItem value={'L3'}>L3</MenuItem>
            <MenuItem value={'M1'}>M1</MenuItem>
            <MenuItem value={'M2'}>M2</MenuItem>
        </Select>
    </FormControl>
</div>

        );
    }
}
export default Test;

