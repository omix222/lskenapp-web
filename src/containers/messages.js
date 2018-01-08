/*
    Container Components
    Presentational component に具体的なデータやコールバック関数を与えるコンポーネント
*/
import React, { Component } from "react";
import styled from 'styled-components';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { routerActions } from 'react-router-redux'

const Input = styled.textarea`
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: .3rem;
    display: block;
    width: 100%;
    color: #495057;
    background-color: #fff;
    background-image: none;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
`;
const OtherTalk = styled.p`
    &:before { content: "${ props => props.name}"; }
    &:after  { background-image: url(./img/def_user.png); }
`;

class MessagesComponent extends Component {
    componentDidMount() {
        //window.componentHandler.upgradeDom();
        // window.componentHandler.upgradeAllRegistered();
    }
    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
                <header className="mdl-layout__header">
                    <div className="mdl-layout__header-row">
                        <span className="mdl-layout-title">メッセージ一覧</span>
                        <div className="mdl-layout-spacer"></div>
                        <nav className="mdl-navigation mdl-layout--large-screen-only">
                        {/*
                            <a className="mdl-navigation__link" href="">Link1</a>
                        */}
                        </nav>
                    </div>
                </header>


                <main className="mdl-layout__content" style={{ background: '#ffffff' }}>
                    <div className="mdl-grid">
                        <div className="mdl-cell mdl-cell--2-col"></div>
                        <div className="mdl-cell mdl-cell--8-col entry-content">
                            <div style={{ padding: '0px 10px' }}>
                                <OtherTalk className="other-line" name={'たろう'}>
                                    <span className="other-toge">ああああああいいいいいううううう</span>
                                </OtherTalk>
                                <p className="my-line">
                                    <span className="my-toge">いいいい</span>
                                </p>
                                <OtherTalk className="other-line" name="じろう">
                                    <span className="other-toge">じろうの発言です。<br/>改行改行</span>
                                </OtherTalk>
                                <OtherTalk className="other-line stamp" name={'たろう'}>
                                    <span>
                                        <img src="https://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20170423/20170423030055.png" alt="f:id:tawashix:20170423030055p:plain"
                                            title="f:id:tawashix:20170423030055p:plain" className="hatena-fotolife"  />
                                    </span>
                                </OtherTalk>

                                <p className="my-line stamp">
                                    <span>
                                        <img src="https://cdn-ak.f.st-hatena.com/images/fotolife/t/tawashix/20170423/20170423030055.png" alt="f:id:tawashix:20170423030055p:plain"
                                            title="f:id:tawashix:20170423030055p:plain" className="hatena-fotolife"  />
                                    </span>
                                </p>

                                <p className="my-line">
                                    <span className="my-toge">うううううううううううううう</span>
                                </p>
                            </div>
                        </div>
                        <div className="mdl-cell mdl-cell--2-col"></div>
                    </div>
                </main>
                <footer className="mdl-mini-footer" style={{ background: '#ECEEF3', padding: 0, height: '180px' }}>
                    <div className="mdl-grid" style={{ width: '100%' }}>
                        <div className="mdl-cell mdl-cell--12-col">
                            <Input placeholder="メッセージを入力してください。" />
                        </div>
                        <div className="mdl-cell mdl-cell--12-col">
                            <button className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                                Send
                            </button>
                            <button className="mdl-button mdl-js-button mdl-button--icon" style={{ marginLeft: 10 }}>
                                <i className="material-icons">mood</i>
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
};






// ReduxのStoreを第一引き数に取る関数で、ComponentにPropsとして渡すものをフィルタリングしたい時に使う
const mapStateToProps = state => {
    console.info("Messages#mapStateToProps");
    return state.auth;
}

const mapDispatchToProps = dispatch => {
    console.info("Messages#mapDispatchToProps");
    return {
        routerActions: bindActionCreators(Object.assign({}, routerActions), dispatch),
        onClick: () => {
            //console.info('onClick:login');
            //dispatch(routerActions.push("/app"));
            //dispatch(login('hoge'));
        },
    };
}
// NewComponent = connect(Componentからdispatchされたアクション) (Component)
export const Messages = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesComponent);

