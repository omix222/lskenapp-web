/*
    Container Components
    Presentational component に具体的なデータやコールバック関数を与えるコンポーネント
*/
import React, { Component }   from "react";
import { connect }            from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions }      from 'react-router-redux'
import PropTypes              from 'prop-types';
import { withStyles }         from 'material-ui/styles';

import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

import { loginActions } from '../modules/login'

const styles = theme => ({
    root: {
//      display: 'flex',
//      justifyContent: 'center',
//      alignItems: 'center',
    },
    backTop: {
        display: 'flex',
        justifyContent: 'center',
        height: 124,
        paddingTop: 40,
        backgroundColor: theme.palette.primary[500],
        width: '100%',
    },
    backTitle: {
        color: theme.palette.common.white,
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        marginTop: -64,
        width: 400,
    },
    cardActions: {
        margin: 8,
        justifyContent: 'flex-end',
    },
    button: {
//        color: theme.palette.common.white,
    },
    textField: {
    }
});

class LoginComponent extends Component {
    state = {
        loginId: '',
    };

    componentDidMount() {
        // window.componentHandler.upgradeDom();
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.backTop}>
                <Typography type="display1" className={classes.backTitle}>
                WebAPI開発における設計方法の研究
                </Typography>
                </div>
                <div className={classes.container}>
                <Card className={classes.card}>
                    <CardHeader subheader="Web版Client" title="ログイン" />
                    <CardContent>
                        <TextField
                            error={this.props.errorMessage.length > 0}
                            helperText={this.props.errorMessage}
                            label="ユーザID"
                            className={classes.textField}
                            onChange={this.handleChange('loginId')}
                            margin="normal"
                            fullWidth
                        />
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                        <Button
                            raised
                            className={classes.button}
                            color="primary"
                            onClick={() => {
                                this.props.onClick(this.state.loginId);
                            }}
                            >ログイン</Button>
                    </CardActions>
                </Card>
                </div>
            </div>
        );
    }
};
LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
};

export const ConnectedLogin = connect(
    // mapStateToProps
    state => state.auth,
    // mapDispatchToProps
    dispatch => ({
        routerActions: bindActionCreators(Object.assign({}, routerActions), dispatch),
        onClick: (userId) => {
            //dispatch(routerActions.push("/messages"));
            dispatch(loginActions.login(userId));
        },
    })
)(withStyles(styles)(LoginComponent));

