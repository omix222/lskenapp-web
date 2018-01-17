import React, { Component }   from "react";
import { withStyles } from 'material-ui/styles';
import PropTypes              from 'prop-types';
import moment from 'moment';

const styles = theme => ({
    root: {
    },
    talkContainer: {
        display: 'flex',
        margin: '20px 0px',
    },
    myContainer: {
        display: 'flex',
        flexDirection: 'row-reverse',
        margin: 20,
    },
    talkContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    myContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    talkIcon: {
        width:36,
        height:36,
        borderRadius:40
    },
    talkUser: {
        color: theme.palette.grey[500],
        fontSize: '.8em',
    },
    myTalk: {
        display: 'inline-block',
        fontSize: '.8em',
        maxWidth: 280,
        padding: '5px 10px',
        borderRadius: 10,
        // fontSize: '1.3rem',
        // minHeight: 30,
        wordWrap: 'break-word',
        position: 'relative',
        marginRight: 10,
        backgroundColor: '#C2F5A8',
        '&:before': {
            zIndex: -1,
            height:0,
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 2,
            border: '8px solid transparent',
            right: -16,
            transform: 'rotate(-20deg)',
            borderLeft: '25px solid #C2F5A8',
        }
    },
    timestamp: {
        alignSelf: 'flex-end',
        color: theme.palette.grey[500],
        fontSize: '.4em',
        padding: '0px 0px 4px 8px',
    },
    myTimestamp: {
        alignSelf: 'flex-end',
        color: theme.palette.grey[500],
        fontSize: '.4em',
        padding: '0px 8px 4px 0px',
    },
    otherTalk: {
        display: 'inline-block',
        fontSize: '.8em',
        maxWidth: 280,
        padding: '5px 10px',
        borderRadius: 10,
        // fontSize: '1.3rem',
        // minHeight: 30,
        wordWrap: 'break-word',
        position: 'relative',
        marginLeft: 10,
        backgroundColor: '#ECEEF3',
        '&:before': {
            zIndex: -1,
            height:0,
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 2,
            border: '8px solid transparent',
            left: -16,
            transform: 'rotate(20deg)',
            borderRight: '25px solid #ECEEF3',
        }
    },
});

class TextMessage_ extends Component {
    render() {
        const { me, classes, name, text, postDate } = this.props;
        let date = moment(postDate).format("MM/DD HH:mm");
        if (me) {
            // 自分の場合
            return (
                <div className={classes.myContainer}>
                    <div className={classes.myContent}>
                        <div className={classes.myTalk}>
                        {text}
                        </div>
                    </div>
                    <span className={classes.myTimestamp}>{date}</span>
                </div>
            );
        } else {
            // 他人の場合
            return (
                <div className={classes.talkContainer}>
                    <img className={classes.talkIcon} src="./img/def_user.png" alt="" />
                    <div className={classes.talkContent}>
                        <div className={classes.talkUser}>
                            {name}
                        </div>
                        <div className={classes.otherTalk}>
                            {text}
                        </div>
                    </div>
                    <span className={classes.timestamp}>{date}</span>
                </div>
            );
        }
    }
}
TextMessage_.propTypes = {
    classes: PropTypes.object.isRequired,
    me: PropTypes.bool,
    name: PropTypes.string,
    text: PropTypes.string,
};

class StampMessage_ extends Component {

    render() {
        const { me, classes, name, postDate, imgdata } = this.props;
        let date = moment(postDate).format("MM/DD HH:mm");
        if (me) {
            return (
                <div className={classes.myContainer}>
                    <div className={classes.myContent}>
                        <img src={"data:image/png;base64," + imgdata} alt="" />
                    </div>
                    <span className={classes.myTimestamp}>{date}</span>
                </div>
            );
        } else {
            return (
                <div className={classes.talkContainer}>
                    <img className={classes.talkIcon} src="./img/def_user.png" alt="" />
                    <div className={classes.talkContent}>
                        <div className={classes.talkUser}>
                            {name}
                        </div>
                        <img src={"data:image/png;base64," + imgdata} alt="" />
                    </div>
                    <span className={classes.timestamp}>{date}</span>
                </div>
            );
        }
    }
}


export const TextMessage  = withStyles(styles)(TextMessage_);
export const StampMessage = withStyles(styles)(StampMessage_);

TextMessage.defaultProps  = { me: false};
StampMessage.defaultProps = { me: false};


