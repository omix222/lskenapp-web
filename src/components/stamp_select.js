import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Drawer from 'material-ui/Drawer';

const styles = theme => ({
    root: {
        display: 'flex',
        height: 148,
        padding: 4,
    },
    stamp: {
        padding: 8,
        alignSelf: 'flex-start',
        '&:hover' : {
            cursor: 'pointer',
            backgroundColor: theme.palette.primary[200]
        }
    }

});
class StampSelect extends React.Component {

    componentDidMount() {
        this.props.onInit();
    }

    render() {
        const { classes, stamps } = this.props;

        return (
            <Drawer
              anchor="bottom"
              open={this.props.open}
              onClose={this.props.onClose}>
            <div className={classes.root}>
                {stamps.map((stamp) => {
                    return (
                    <div
                        className={classes.stamp}
                        key={stamp.filename}
                        onClick={() => {
                            this.props.onSelect(stamp.filename)
                        }}>
                    <img src={"data:image/png;base64," + stamp.data} alt="" />
                    </div>
                    );
                })}
            </div>
        </Drawer>
        );
    }

}
export default withStyles(styles)(StampSelect);
