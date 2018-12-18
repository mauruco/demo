import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addCourse, reloadCards } from './actions';
import './style.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


import Loader from '../../../components/Loader';
import Alert from '../../../components/Alert';

import Config from '../../../Config';

class AddCourse extends Component {

    constructor(props) {

        super(props);

        this.state = {
            applicationInProgress: false,
            message: '',
            course: '',
            text: '',
            courseError: false,
            textError: false,
            open: false,
            cats: [{id: 1, category: 'À distância', check: false},{id: 2, category: 'Técnico', check: false},{id: 3, category: 'Especialização', check: false}],
            sw: [],
            initilaState: {},
            callBack: false
        };

        this.state.initilaState = {...this.state};
    }
    
    makeSw() {
        
        let sw = [];
    
        for(let i = 0; i < this.state.cats.length; i++)
            sw.push(<FormControlLabel key={i} control={<Switch checked={this.state.cats[i].check} onChange={(e) => this.changeHandler(i, e)} value={`sw${i}`}/>} label={this.state.cats[i].category}/>);
            
        this.setState({sw});
    }

    componentWillReceiveProps(nextProps) {
        
        this.setState({...nextProps.addCourseReducer}, ()=>{
    
            if(this.state.callBack)
                return this.props.reloadCards();
        });
    }

    
    alertHandler(e) {

        this.setState({message: ''});
    }

    changeHandler(i, e) {
        
        let obj = {...this.state.cats};
        obj[i].check = obj[i].check ? false : true;
        this.setState(obj, ()=>{
            
            this.makeSw();
        });
    }

    inputChangeHandler(key, e) {

        let obj = {};
        obj[key] = e.target.value;
        this.setState(obj);
    }

    formSendHandler(e) {

        let courseError = false,
        textError = false;

        if(!this.state.course)
            courseError = true;

        if(!this.state.text)
            textError = true;
            
        this.setState({courseError, textError});
        
        if(courseError || textError) {

            this.setState({message: <span>Por favor, preencha todos os campos com dados válidos.</span>})
            return;
        }

        let cats = [];
        for(let i = 0; i < this.state.cats.length; i++)
            if(this.state.cats[i].check) cats.push(this.state.cats[i].id);

        this.tryAddCourse(this.state.course, this.state.text, cats);
    }

    tryAddCourse(course, text, categories) {
        
        this.setState({applicationInProgress: true}, ()=>{
            
            setTimeout(()=>{

                this.props.addCourse({course, text, categories});
            }, Config.timeout);
        });
    }

    render() {
        
        return(
            <div id="add-course">
                <Grid container spacing={8} className="add-action">
                    <Grid item xs={12} className="align-right">
                        <Button variant="fab" color="secondary" aria-label="Add" onClick={()=>{this.setState({...this.state.initilaState, open: true},()=>{this.makeSw()})}}>
                            <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
                <Dialog open={this.state.open} onClose={()=>{this.setState({open: false})}} aria-labelledby="form-dialog-title">
                    <DialogTitle>Adicionar novo curso</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <span className="force-modal-width">Todos os campos abaixo são obrigatórios.</span>
                        </DialogContentText>
                        <TextField autoFocus margin="dense" label="Título" type="text" error={this.state.courseError} onChange={(e)=>{this.inputChangeHandler('course', e)}} fullWidth/>
                        <TextField margin="dense" label="Descrição" type="text" error={this.state.textError} onChange={(e)=>{this.inputChangeHandler('text', e)}}  fullWidth/>
                        <Grid container spacing={0} className="add-action">
                            {this.state.sw}
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>{this.setState({open: false})}} color="primary">
                        Cancelear
                        </Button>
                        <Button onClick={()=>{this.formSendHandler()}} color="primary">
                        Enviar
                        </Button>
                    </DialogActions>
                </Dialog>
                <Alert message={this.state.message} onClick={(e)=>{this.alertHandler(e)}}/>
                <Loader show={this.state.applicationInProgress}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        addCourseReducer: state.addCourseReducer
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        addCourse: (data) => {
            dispatch(addCourse(data));
        },
        reloadCards: () => {
            dispatch(reloadCards());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCourse);