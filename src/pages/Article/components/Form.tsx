import React from "react";
import { Form, Input, Button } from "antd";
import { WrappedFormUtils } from "antd/es/form/Form";

import styles from "./article.less"

export interface FormUtil {
  form?: WrappedFormUtils;
}

const FormItem = Form.Item;

// 文章搜索表单
class ArticlSearchForm extends React.Component<FormUtil, any> {
    constructor(props) {
        super(props)

        this.state = {
            dispatch: Function
        }
    }
    // 响应点击查询按钮
    handleSubmit = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;

        form.validateFields( (err, fieldsValue) => {
            if (err) return;
            dispatch({
                type: "article/fetch",
                payload: { where: { ...fieldsValue } }
            })
        })
    }
    // 响应点击重置按钮
    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        dispatch({
          type: "rule/fetch",
          payload: {},
        });
    };
    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        
        return (
            <Form layout="inline" className={styles.form}>
                    <FormItem label="文章标题">
                        {getFieldDecorator("title", {
                            rules: [
                                { required: false, message: "输入文章标题" }
                            ],
                        })(
                            <Input placeholder="请输入文章标题" />
                        )}
                    </FormItem>
                    <FormItem label="作者">
                        {
                        getFieldDecorator("author", {
                            rules: [{ required: false, message: "输入文章作者" }]
                        })(<Input placeholder="请输入文章作者" />)
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            查询
                        </Button>
                        <Button style={{"marginLeft": 15}} onClick={this.handleFormReset}>
                            重置
                        </Button>
                    </FormItem>
            </Form>
        )
    }
}

// @ts-ignore
export default Form.create()(ArticlSearchForm);