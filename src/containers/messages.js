/*
    Container Components
    Presentational component に具体的なデータやコールバック関数を与えるコンポーネント
*/
import React, { Component }   from "react";
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions }      from 'react-router-redux'
import PropTypes              from 'prop-types';
import classNames             from 'classnames';
import { withStyles }         from 'material-ui/styles';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import ChatIcon from 'material-ui-icons/Chat';

const drawerWidth = 200;
const styles = theme => ({
    root: {
        width: '100%',
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    flex: {
        flex: 1,
    },
    appBar: {
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        height: '100%',
        width: drawerWidth,
    },
    drawerHeader: theme.mixins.toolbar,
    content: {
        backgroundColor: theme.palette.background.white,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    other:{
        '&:before': {
            content: '"たわし"'
        },
        '&:after': {
            backgroundImage: "url(http://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20160910/20160910223959.png)"
        }
    },
    talkContainer: {
        display: 'flex',
        margin: 20,
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
        width:45,
        height:45,
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
    }
});
const otherTalkStyles = props => ({
    other: {
        '&:after': {
            backgroundImage: "url(http://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20160910/20160910223959.png)"
        }
    },
});

class OtherTalkComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.talkContainer}>
                <img className={classes.talkIcon} src="./img/def_user.png" />
                <div className={classes.talkContent}>
                    <div className={classes.talkUser}>あああ</div>
                    <div className={classes.otherTalk}>あいうえおかきくけこさしすせそあああ</div>
                </div>
            </div>
        );
    }
}
const OtherTalk = withStyles(styles)(OtherTalkComponent);
//Stamp.defaultProps = { me: false};

class TalkComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.myContainer}>
                <div className={classes.talkContent}>
                    <div className={classes.myTalk}>あいうえおかきくけこさしすせそあああ</div>
                </div>
            </div>
        );
    }
}
const MyTalk = withStyles(styles)(TalkComponent);

class StampComponent extends Component {
    render() {
        const { me, classes } = this.props;
        return (
            <div className={classes.otherContainer}>
                <img src="https://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20170423/20170423030055.png" />
            </div>
        );
    }
}
const Stamp = withStyles(styles)(StampComponent);
Stamp.defaultProps = { me: false};



class Messages extends Component {
    componentDidMount() {
    }
    render() {
        const { classes } = this.props;
        const anchor = "left"
        const drawer = (
            <Drawer
                type="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={anchor}>
                <div className={classes.drawerHeader} />
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <ChatIcon />
                        </ListItemIcon>
                        <ListItemText primary="aaa" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button component="a" href="/">
                        <ListItemText primary="ログアウト" />
                    </ListItem>
                </List>
            </Drawer>
        );
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <AppBar className={classNames(classes.appBar, classes[`appBar-${anchor}`])}>
                        <Toolbar>
                            <Typography type="title" color="inherit" className={classes.flex}>
                            メッセージ一覧
                            </Typography>
                            <Button color="contrast" component="a" href="/" >ログアウト</Button>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                    <main className={classes.content}>
                        <div>
                            <OtherTalk name="はしもと" text="おはよう" />
                            <MyTalk name="はしもと" text="おはよう" />
                            <Stamp name="はしもと" text="おはよう" />
                        </div>
                    </main>
                </div>
            </div>
        );
    }
};






export const ConnectedMessages = connect(
    // mapStateToProps
    state => state.auth,
    // mapDispatchToProps
    dispatch => ({
        routerActions: bindActionCreators(Object.assign({}, routerActions), dispatch),
        onClick: () => {
            //dispatch(execLogin(userId));
        },
    })
)(withStyles(styles)(Messages));

