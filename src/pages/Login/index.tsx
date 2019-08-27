/**
 * @name LoginComponent
 * @desc 登录页面
 * 用户登录成功后用户信息写入localstorage
 */
import React from "react";
import { connect } from "dva";
import { Form, Input, Button } from "antd";
import { FormUtil } from "@components/Form";
import styles from "./login.less";

@Form.create()
class LoginComponent extends React.Component<FormUtil, any> {
    constructor(props) {
        super(props)
    }
    // 登录
    handleSubmit = (e) => {
        const { dispatch, form } = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;
            dispatch({
                type: "login/login",
                payload: { ...fieldsValue }
            })
        })
    }
    render() {
        const FormItem = Form.Item
        const {form: {getFieldDecorator}} = this.props
        
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
                                { required: true, message: "请输入正确的登录密码" }
                            ],
                        })(
                            <Input placeholder="请输入密码" type="password"/>
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
}))(LoginComponent);
