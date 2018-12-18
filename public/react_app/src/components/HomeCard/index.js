import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import './style.css';
import Config from '../../Config';

const HomeCard = props => {

    if(!props.id) return ''

    let emptyFunction = ()=>{};
    let img = props.img || 'placeholder.png',
    title = props.title || 'Lizard',
    text = props.text || 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica',
    onClick = props.onClick || emptyFunction;

    return (
        <Grid item xs={4} className="home-card">
            <Card className="relative">
                <CardActionArea>
                    <CardMedia style={{height: 140, backgroundColor: '#EEEEEE'}} image={`${Config.publicUrl}/img/${img}`} title={title}/>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                        {title}
                        </Typography>
                        <Typography component="p">
                        {text}
                        <span className="force-width"></span>
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                    COMPARTILHAR
                    </Button>
                    <Button size="small" color="primary">
                    SAIBA MAIS
                    </Button>
                    <div className="actions">
                        <Button variant="fab" mini color="secondary" aria-label="Edit" className="edit" onClick={(e)=>{onClick({type: 'edit', id: props.id})}}>
                            <Icon>edit_icon</Icon>
                        </Button>
                        <Button variant="fab" mini aria-label="Delete" onClick={(e)=>{onClick({type: 'delete', id: props.id})}}>
                            <DeleteIcon />
                        </Button>
                    </div>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default HomeCard;