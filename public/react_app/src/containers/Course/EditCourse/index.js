import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editCourse, getCourse, reloadCards } from './actions';
import './style.css';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


import Loader from '../../../components/Loader';
import Alert from '../../../components/Alert';
import Config from '../../../Config';

class EditCourse extends Component {

    constructor(props) {

        super(props);

        this.state = {
            id: null,
            applicationInProgress: false,
            message: '',
            course: '',
            text: '',
            courseError: false,
            textError: false,
            open: false,
            reset: false,
            cats: [{id: 1, category: 'À distância', check: false},{id: 2, category: 'Técnico', check: false},{id: 3, category: 'Especialização', check: false}],
            sw: [],
            callBack: false,
            initialState: {}
        };

        this.state.initialState = {...this.state};
    }

    componentDidMount() {
        
        this.makeSw();
    }
    
    makeSw() {
        
        let sw = [];
    
        for(let i = 0; i < this.state.cats.length; i++)
            sw.push(<FormControlLabel key={i} control={<Switch checked={this.state.cats[i].check} onChange={(e) => this.changeHandler(i, e)} value={`sw${i}`}/>} label={this.state.cats[i].category}/>);
    
        this.setState({sw});
    }

    componentWillReceiveProps(nextProps) {
        
        if(nextProps.editCourseReducer.id && nextProps.editCourseReducer.id != this.state.id) {
            
            this.setState({id: nextProps.editCourseReducer.id}, ()=>{
                
                this.getCourse(nextProps.editCourseReducer.id);
            });
            
            return;
        }
        
        this.setState({...nextProps.editCourseReducer}, ()=>{
    
            if(this.state.callBack)
                return this.props.reloadCards();

            this.makeSw();
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

            this.setState({message: <span>Por favor preenchas todos campos com dados válidos.</span>})
            return;
        }

        let cats = [];
        for(let i = 0; i < this.state.cats.length; i++)
            if(this.state.cats[i].check) cats.push(this.state.cats[i].id);

        this.tryEditCourse(this.state.id, this.state.course, this.state.text, cats);
    }

    tryEditCourse(id, course, text, categories) {
        
        this.setState({applicationInProgress: true}, ()=>{
            
            setTimeout(()=>{

                this.props.editCourse({id, course, text, categories});
            }, Config.timeout);
        });
    }

    getCourse(id) {
        
        this.setState({applicationInProgress: true}, ()=>{
            
            setTimeout(()=>{

                this.props.getCourse(id);
            }, Config.timeout);
        });
    }

    render() {
        
        return(
            <div id="edit-course">
                <Dialog open={this.state.open} onClose={()=>{this.setState({open: false})}} aria-labelledby="form-dialog-title">
                    <DialogTitle>Adicionar novo curso</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <span className="force-modal-width">Todos os campos a baixo são obritgaorios.</span>
                        </DialogContentText>
                        <TextField autoFocus margin="dense" label="Título" type="text" error={this.state.courseError} onChange={(e)=>{this.inputChangeHandler('course', e)}} value={this.state.course} fullWidth/>
                        <TextField margin="dense" label="Descrição" type="text" error={this.state.textError} onChange={(e)=>{this.inputChangeHandler('text', e)}} value={this.state.text} fullWidth/>
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
        editCourseReducer: state.editCourseReducer
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        editCourse: (data) => {
            dispatch(editCourse(data));
        },
        getCourse: (id) => {
            dispatch(getCourse(id));
        },
        reloadCards: () => {
            dispatch(reloadCards());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCourse);