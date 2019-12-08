import React, { useContext } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { LOGIN } from '@/const/api';
import { AppContext } from '@/App';
import { ADVANCED_USER, GENERAL_USER } from '@/store/actionType';
import ajax from '@/util/request';
import get from 'lodash/get';
import './index.less';

const AUTH_STATUS = {
    1: GENERAL_USER,
    2: ADVANCED_USER
};

function Login (props) {
    const { history } = props;
    const dispatch = useContext(AppContext)[1];
    const { getFieldDecorator, validateFields } = props.form;

    function handleSubmit (e) {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                ajax({
                    method: 'POST',
                    url: LOGIN,
                    data: values
                }).then(res => {
                    let auth = get(res, 'data.auth', 0),
                        user = get(res, 'data.user', '');
                    dispatch({
                        type: AUTH_STATUS[auth],
                        user
                    });
                    message.success('登录成功');
                    history.replace('/home');
                }).catch(() => {
                    message.warning('登录失败，请刷新重试');
                })
            }
        });
    };

    return (
        <section className="login-wrapper">
            <Form onSubmit={handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('account', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" 
                            htmlType="submit" 
                            className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </section>
    )
}

export default Form.create({})(Login);;