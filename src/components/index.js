/*
    Presentational Components
    見た目だけを扱うコンポーネント
*/
import React, { Component } from "react";


class Container extends Component {
    render() {
        return (
            <div>
                <button onClick={ () => this.props.onClick() } >
                    button
                </button>
                <div>
                    { this.props.value }
                </div>
            </div>
        );
    }
};

export default Container;