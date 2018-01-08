/*
    Presentational Components
    見た目だけを扱うコンポーネント
*/
import React, { Component } from "react";
import { Link } from 'react-router-dom'


class Drawer extends Component {
    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Web版 Client</span>
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="/">ログアウト</a>
                </nav>
            </div>

        );
    }
};

export default Drawer;