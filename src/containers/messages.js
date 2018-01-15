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
import IconButton from 'material-ui/IconButton';
import ChatIcon from 'material-ui-icons/Chat';
import SendIcon from 'material-ui-icons/Send';
import InsertEmoticonIcon from 'material-ui-icons/InsertEmoticon';




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
        minHeight: 'calc(100% - 56px)',
        overflowY: 'auto',
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
    inputPanel: {
        position: 'fixed',
        bottom: 0,
        height: 64+1,
        width: '100%',
        zIndex: 2000,
        backgroundColor: theme.palette.common.white,
    },
    inputPanelInner: {
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        border: 0,
        resize: 'none',
        height: 59,
        fontSize: '1em',
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth + 120}px)`,
        /*
        position: 'absolute',
        left: drawerWidth,
        */
    },
    button: {
        //margin: theme.spacing.unit * 0.2,
    },
});
const otherTalkStyles = props => ({
    other: {
        '&:after': {
            backgroundImage: "url(http://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20160910/20160910223959.png)"
        }
    },
});

class TalkComponent extends Component {
    render() {
        const { me, classes } = this.props;
        if (me) {
            return (
                <div className={classes.myContainer}>
                    <div className={classes.myContent}>
                        <div className={classes.myTalk}>
                        あいうえおかきくけこさしすせそあああ
                        </div>
                    </div>
                    <span className={classes.myTimestamp}>09:30</span>
                </div>
            );
        } else {
            return (
                <div className={classes.talkContainer}>
                    <img className={classes.talkIcon} src="./img/def_user.png" />
                    <div className={classes.talkContent}>
                        <div className={classes.talkUser}>
                        あああ
                        </div>
                        <div className={classes.otherTalk}>
                        あいうえおかきくけこさしすせそあああ
                        </div>
                    </div>
                    <span className={classes.timestamp}>09:00</span>
                </div>
            );
        }
    }
}
const Talk = withStyles(styles)(TalkComponent);
Talk.defaultProps = { me: false};

class StampComponent extends Component {

    render() {
        const { me, classes } = this.props;
        if (me) {
            return (
                <div className={classes.myContainer}>
                    <div className={classes.myContent}>
                        <img src="https://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20170423/20170423030055.png" />
                    </div>
                    <span className={classes.myTimestamp}>09:00</span>
                </div>
            );
        } else {
            return (
                <div className={classes.talkContainer}>
                    <img className={classes.talkIcon} src="./img/def_user.png" />
                    <div className={classes.talkContent}>
                        <div className={classes.talkUser}>
                        あああ
                        </div>
                        <img src="https://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20170423/20170423030055.png" />
                    </div>
                    <span className={classes.timestamp}>09:00</span>
                </div>
            );
        }
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
                            <Talk name="はしもと" text="おはよう" />
                            <Talk me={true} name="はしもと" text="おはよう" />
                            <Stamp name="はしもと" />
                            <Talk name="はしもと" text="おはよう" />
                            <Stamp me={true} />
                            <Stamp me={true} />
                        </div>
                    </main>
                </div>
                <div className={classes.inputPanel}>
                    <Divider />
                    <div className={classes.inputPanelInner}>
                        <textarea className={classes.input} placeholder="メッセージを入力してください。" row="2">
                        </textarea>
                        <IconButton className={classes.button} aria-label="スタンプ">
                            <InsertEmoticonIcon />
                        </IconButton>
                        <IconButton className={classes.button} aria-label="送信">
                            <SendIcon />
                        </IconButton>
                    </div>
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

