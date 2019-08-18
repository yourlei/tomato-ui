import React from 'react';
import { Form, Input, Button } from 'antd';
import { WrappedFormUtils } from 'antd/es/form/Form';

import styles from './article.less'

export interface FormUtil {
  form?: WrappedFormUtils;
//   handleSubmit?: 
}

const FormItem = Form.Item

class ArticlSearchForm extends React.Component<FormUtil, any> {
    render() {
        const {
            form: { getFieldDecorator },
            handleSubmit,
        } = this.props;
        console.log(handleSubmit, "........")
        return (
            <Form layout="inline" className={styles.form}>
                    <FormItem label="文章标题">
                        {getFieldDecorator('title', {
                            rules: [
                                { required: false, message: '输入文章标题' }
                            ],
                        })(
                            <Input placeholder="请输入文章标题" />
                        )}
                    </FormItem>
                    <FormItem label="作者">
                        {
                        getFieldDecorator('title', {
                            rules: [{ required: false, message: '输入文章作者' }]
                        })(<Input placeholder="请输入文章作者" />)
                        }
                    </FormItem>
                    <FormItem>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </FormItem>
            </Form>
        )
    }
}

// @ts-ignore
export default Form.create()(ArticlSearchForm);