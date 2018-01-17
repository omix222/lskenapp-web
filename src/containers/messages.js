/*
    Container Components
    Presentational component に具体的なデータやコールバック関数を与えるコンポーネント
*/
import React, { Component }   from "react";
import ReactDOM from 'react-dom';
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
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChatIcon from 'material-ui-icons/Chat';
import SendIcon from 'material-ui-icons/Send';
import InsertEmoticonIcon from 'material-ui-icons/InsertEmoticon';
import StampSelect from '../components/stamp_select';
import { TextMessage, StampMessage } from '../components/message';
import { messagesActions } from '../modules/messages'


const drawerWidth = 240;
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
    state = {
        messageDetail: '',
        disableSendButton: true,
    };

    componentDidMount() {
        this.props.doGetMessages();
    }

    componentDidUpdate(prevProps, prevState) {
        console.info("componentDidUpdate", this.props);
        if (prevProps.isFetchingMessages && !this.props.isFetchingMessages) {
            /* メッセージの末尾にスクロール */
            let content = ReactDOM.findDOMNode(this.refs.content);
            content.scrollTop = content.scrollHeight + 200;
        }
    }

    handleChange = name => event => {
        let val = event.target.value;
        let disableSendButton = true;

        if (name === 'messageDetail' && val) {
            disableSendButton = false;
        }

        this.setState({
          [name]: event.target.value,
          disableSendButton: disableSendButton,
        });
    };

    handlePostMessage = () => event => {
        this.props.onPostMessage(this.state.messageDetail);
    };

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
                        <ListItemText primary="グループ名(仮)" />
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
                    <main ref="content" className={classes.content}>
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
                                } else if (message.type === 'stamp') {
                                    return (
                                        <StampMessage
                                            key={message.messageId}
                                            me={message.fromUserName === this.props.userName}
                                            name={message.fromUserName}
                                            postDate={message.postDate}
                                            imgdata={message.messageDetail} />
                                    );
                                } else {
                                    return (
                                        <div key={message.messageId}>未実装</div>
                                    );
                                }
                            })}
                        </div>
                        {/*<StampSelect />*/}
                        <div style={{height:73}}></div>
                    </main>
                </div>
                <div className={classes.inputPanel}>
                    <Divider />
                    <div className={classes.inputPanelInner}>
                        <textarea
                            className={classes.input}
                            placeholder="メッセージを入力してください。"
                            row="2"
                            onChange={this.handleChange('messageDetail')}
                            >
                        </textarea>
                        <IconButton
                            className={classes.button}
                            aria-label="スタンプ"
                            >
                            <InsertEmoticonIcon />
                        </IconButton>
                        <IconButton
                            color="primary"
                            disabled={this.state.disableSendButton}
                            className={classes.button}
                            aria-label="送信"
                            /*
                            onClick={() => {
                                this.props.onPostMessage(this.state.messageDetail);
                            }}
                            */
                            onClick={this.handlePostMessage()}
                            >
                            <SendIcon />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
};
Messages.propTypes = {
    classes: PropTypes.object.isRequired,
};


export const ConnectedMessages = connect(
    // mapStateToProps
    state => {
        return {...state.messages, ...state.auth.data}
    },
    // mapDispatchToProps
    (dispatch) => ({ dispatch }),
    // mergeProps
    (stateProps, dispatchProps, ownProps)  => {
        const dispatch = dispatchProps.dispatch;
        return Object.assign({}, ownProps, stateProps, {
            routerActions: bindActionCreators(Object.assign({}, routerActions), dispatch),

            doGetMessages: (onAfterCallback) => {
                dispatch(messagesActions.getMessages());
            },
            onPostMessage: (messageDetail) => {
                dispatchProps.dispatch(messagesActions.postMessage({
                    type: 'text',
                    messageDetail,
                    groupId: stateProps.groupId,
                    fromUserId: stateProps.userId
                }, function() {
                    dispatch(messagesActions.getMessages());
                }));
            }
        });
    }
)(withStyles(styles)(Messages));

