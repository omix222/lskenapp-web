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
import StampSelect from '../components/stamp_select';
import { TextMessage, StampMessage } from '../components/message';
import { messagesActions } from '../modules/messages'




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
        minHeight: 'calc(100% - 56px)',
        overflowY: 'auto',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    messageList: {
        padding: theme.spacing.unit * 3,
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






class Messages extends Component {
    componentDidMount() {
        this.props.onInit();
    }
    render() {
        const { classes, messages } = this.props;
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
                        <div className={classes.messageList}>
                            {messages.map((message) => {
                                if (message.type === 'text') {
                                    return (
                                        <TextMessage
                                            key={message.messageId}
                                            me={message.fromUserName === this.props.userName}
                                            name={message.fromUserName}
                                            postDate={message.postDate}
                                            text={message.messageDetail} />
                                    );
                                } else {
                                    return (
                                        <div key={message.messageId}>未実装</div>
                                    );
                                }
                            })}
                        </div>
                        <StampSelect />
                        <div style={{height:73}}></div>
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
    state => {
        return {...state.messages, ...state.auth.data}
    },
    // mapDispatchToProps
    dispatch => ({
        routerActions: bindActionCreators(Object.assign({}, routerActions), dispatch),
        onInit: () => {
            dispatch(messagesActions.getMessages());
        },
        onClick: () => {
            //dispatch(execLogin(userId));
        },
    })
)(withStyles(styles)(Messages));

