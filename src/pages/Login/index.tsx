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
import Tomato from "../../assets/tomato.svg";

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
            // RSA加密
            const encrypt = new JSEncrypt();
            const { account, passwd, publicKey } = fieldsValue;
            encrypt.setPublicKey(publicKey);

            dispatch({
                type: "login/fetch",
                payload: { account, passwd: encrypt.encrypt(passwd) }
            })
        })
    }
    render() {
        const FormItem = Form.Item
        const {form: {getFieldDecorator}, login} = this.props
        
        return (
            <div className={styles.outer}>
                <div className={styles.middle}>
                    <div className={styles.logo}>
                        <img alt="logo" src={Tomato}/>
                    </div>
                    <Form className={styles.inner}>
                        <FormItem>
                            {getFieldDecorator("account", {
                                rules: [
                                    { required: true, message: "请输入正确的登录账户" }
                                ],
                            })(
                                    
                                <Input placeholder="请输入邮箱/用户名" autoComplete="off"/>
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
                                <Input placeholder="请输入密码" type="password" autoComplete="off"/>
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
            </div>
        )
    }
}

export default connect(({ login }: ConnectState) => ({
    login,
}))(Form.create()(LoginComponent));
