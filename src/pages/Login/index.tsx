/**
 * @name LoginComponent
 * @desc 登录页面
 * 用户登录成功后用户信息写入localstorage
 */
import React from "react";
import { connect } from "dva";
import { Form, Input, Button } from "antd";
import { JSEncrypt } from 'jsencrypt';
import { ConnectState, } from "@/models/connect";
import { FormUtil } from "@components/Form";
import styles from "./login.less";

class LoginComponent extends React.Component<FormUtil, any> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: "login/getRsaPublickey",
            payload: {}
        })
    }
    // 登录
    handleSubmit = (e) => {
        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            dispatch({
                type: "login/fetch",
                payload: { ...fieldsValue }
            })
        })
    }
    render() {
        const FormItem = Form.Item
        const {form: {getFieldDecorator}, login} = this.props
        
        return (
            <div className={styles.formWrap}>
                <Form>
                    <FormItem>
                        {getFieldDecorator("account", {
                            rules: [
                                { required: true, message: "请输入正确的邮箱账号" }
                            ],
                        })(
                                
                            <Input placeholder="请输入邮箱账号" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("passwd", {
                            rules: [
                                { required: true, message: "请输入正确的登录密码" },
                                {
                                    pattern: /^((?=.*\d)(?=.*[a-zA-Z]))[^\s]{8,18}$/,
                                    message: '请输入8位以上字母与数字的组合'
                                }
                    
                            ],
                        })(
                            <Input placeholder="请输入密码" type="password"/>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator("publicKey", {
                            initialValue: login.publicKey
                        })(
                            <textarea style={{display: "none"}}></textarea>
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={this.handleSubmit}>
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default connect(({ login }: ConnectState) => ({
    login,
}))(Form.create()(LoginComponent));
