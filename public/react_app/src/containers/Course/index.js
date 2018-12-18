import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCourses, updateCourse, deleteCourse } from './actions';
import './style.css';
import Grid from '@material-ui/core/Grid';

import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import Confirm from '../../components/Confirm';
import HomeCard from '../../components/HomeCard';

import AddCourse from './AddCourse';
import EditCourse from './EditCourse';
import Config from '../../Config';

class Course extends Component {

    constructor(props) {

        super(props);

        this.state = {

            applicationInProgress: false,
            message: '',
            courses: null,
            cards: [],
            reload: false,
            confirmOpen: false,
            toDeleteId: 0
        };
    }

    componentDidMount() {

        this.setState({applicationInProgress: true}, ()=>{

            setTimeout(()=>{

                this.props.getCourses();
            }, Config.timeout);
        });
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.courseReducer.reload)
            return this.props.getCourses();

        this.setState({...nextProps.courseReducer}, ()=>{

            this.buildCards();
        });
    }

    buildCards() {

        let courses = this.state.courses,
        cards = [];

        if(!courses)
            return;

        for(let i = 0; i < courses.length; i++)
            cards.push(<HomeCard key={i} onClick={(e) => this.cardsOnClickHandler(e)} title={courses[i].course} text={courses[i].text} img={courses[i].img} id={`${courses[i].id}`}/>)

        this.setState({cards});
    }

    cardsOnClickHandler(e) {

        if(e.type === 'edit')
            return this.props.updateCourse(e.id);

        if(e.type === 'delete')
            this.setState({confirmOpen: true, toDeleteId: e.id});
    }

    delete() {

        this.setState({confirmOpen: false}, ()=>{
            
            this.props.deleteCourse(this.state.toDeleteId);
        });
    }

    confirmHandler() {

        this.setState({confirmOpen: false});
    }
 
    render() {
        
        return(
        <div className="course">
            <Grid container spacing={16}>
            {this.state.cards}
            </Grid>
            <AddCourse />
            <EditCourse />
            <Alert message={this.state.message} onClick={(e)=>{this.alertHandler(e)}}/>
            <Confirm open={this.state.confirmOpen} onClick={(e)=>{this.confirmHandler(e)}} onConfirm={()=>{this.delete()}} />
            <Loader show={this.state.applicationInProgress}/>
        </div>
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        courseReducer: state.courseReducer
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        getCourses: () => {
            dispatch(getCourses());
        },
        updateCourse: (id) => {
            dispatch(updateCourse(id));
        },
        deleteCourse: (id) => {
            dispatch(deleteCourse(id));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Course);