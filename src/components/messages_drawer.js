import React, { Component }   from "react";
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions }      from 'react-router-redux'
import PropTypes              from 'prop-types';
import classNames             from 'classnames';
import { withStyles }         from 'material-ui/styles';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ChatIcon from 'material-ui-icons/Chat';
import Divider from 'material-ui/Divider';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function MessagesDrawer(props) {
    const { classes } = props;
    return (
        <div className={classes.root}>
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
        </div>
    );
}

MessagesDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessagesDrawer);

