import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const styles = theme => ({
    root: {
        height: 120,
    }
});
class StampSelect extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
            <Paper className={classes.root} elevation={2}>
            スタンプ選択
            </Paper>
            </div>
        );
    }

}
export default withStyles(styles)(StampSelect);
