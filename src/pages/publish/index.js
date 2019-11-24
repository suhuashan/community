import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import ajax from '@/util/request';
import { PUBLISH_POST } from '@/const/api';
import { AppContext } from '@/App';
import './index.less';

const formItemLayout = {
    labelCol: {
        xs: { span: 4 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

function Publish (props) {
    const [ state ] = useContext(AppContext);
    const { history } = props;
    const { getFieldDecorator, validateFields } = props.form;

    function handleSubmit (e) {
        e.preventDefault();
        
        if (state.auth === 0) {   //0表示未登录
            message.warning('请先登录');
            return;
        }
        validateFields((err, values) => {
            if (!err) {
                ajax({
                    method: 'GET',
                    url: PUBLISH_POST,
                    data: values
                }).then(() => {
                    message.success('发帖成功');
                    history.replace('/home');
                }).catch(() => {
                    message.warning('发帖失败，请刷新重试');
                });
            }
        });
    };
    return (
        <section className="publish-content">
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <Form.Item label="标题" hasFeedback>
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '标题不能为空' }],
                    })(
                        <Input
                            maxLength={20}
                            placeholder="请输入标体，不能超过20个字"
                        />,
                    )}
                </Form.Item>
                <Form.Item label="内容" hasFeedback>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '内容不能为空' }],
                    })(
                        <Input.TextArea
                            type="content"
                            maxLength={1000}
                            rows={6}
                            placeholder="请输入具体内容，不能超出1000个字"
                        />,
                    )}
                </Form.Item>
                <Form.Item className="publish-button">
                    <Button type="primary" 
                            htmlType="submit">
                        发帖
                    </Button>
                </Form.Item>
            </Form>
        </section>
    );
}

export default Form.create({})(Publish);