import React, { useContext } from 'react';
import { AppContext } from '@/App';
import { Link } from 'react-router-dom';
import './index.less';

//用户权限
const AUTH = {
    0: '登录',
    1: '普通',
    2: '高级'
};

function Header () {
    const [state] = useContext(AppContext);

    return (
        <section className="header">
            <div className="header-title">Community 社区</div>
            <div className="header-index">
                <Link to="/home">首页</Link>
            </div>
            <div className="header-publish">
                <Link to="/publish">说一说</Link>
            </div>
            <div className="header-login">
                <Link to="/login">{AUTH[state.auth]}</Link>
            </div>
        </section>
    )
}

export default Header;