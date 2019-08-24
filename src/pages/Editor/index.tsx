/**
 * 文章编辑器
 */
import React from "react";
import { connect } from "dva";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { Form, Input } from "antd";
import { WrappedFormUtils } from "antd/es/form/Form";
import EditableTagGroup from "./components/MyTag";
import { create } from '@/services/article';


export interface FormUtil {
    form?: WrappedFormUtils;
}

class Editor extends React.Component<FormUtil, any> {
    /** 
     * markdown编辑器 
     * Usage see: https://www.yuque.com/braft-editor/be/mrgy92
     */
    /*
    constructor(props) {
        super(props)
        this.state = {
            contextValue: String
        }
    }
    // 存为草稿
    handleSaveToDraft = (e) => {
        // 保存文本

    } */
    state = {
        dispatch: Function,
        title: "",
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(null)
    }
    // async componentDidMount () {
        // 假设此处从服务端获取html格式的编辑器内容
        // const htmlContent = await fetchEditorContent()
        // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
        // this.setState({
        //     editorState: BraftEditor.createEditorState(htmlContent)
        // })
    // }
    // 保存编辑器内容
    submitContent = async () => {
        let title = ""
        const { dispatch, form } = this.props;
        form.validateFields( (err, fieldsValue) => {
            if (err) return;
            title = fieldsValue.title
        })
        // 在编辑器获得焦点时按下ctrl+s会执行此方法
        // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
        const htmlContent = this.state.editorState.toHTML()
        const result = await create({
            title: title,
            content: htmlContent,
            author: "leiyu",
            status: 1,
            cid: "kjfdflsjfldsj"
        })
    }

    handleEditorChange = (editorState) => {
        this.setState({ editorState })
    }
    render() {
        const { 
            form: {
                getFieldDecorator
            } 
        } = this.props
        const FormItem = Form.Item;
        const { editorState } = this.state

        const extendControls = [
            "separator",
            {
                key: "btn-save", // 控件唯一标识，必传
                type: "button",
                title: "文章保存到草稿", // 指定鼠标悬停提示文案
                className: "my-button", // 指定按钮的样式名
                html: "<strong>存为草稿</strong>", // 指定在按钮中渲染的html字符串
                text: "存为草稿",
                onClick: () => {
                    console.log("Hello World!");
                },
            },
            "separator",
            {
                key: "btn-publish", // 控件唯一标识，必传
                type: "button",
                title: "发布文章", // 指定鼠标悬停提示文案
                className: "my-button", // 指定按钮的样式名
                html: "<strong>发布文章</strong>", // 指定在按钮中渲染的html字符串
                text: "发 布", // 指定按钮文字，此处可传入jsx，若已指定html，则text不会显示
                onClick: () => {
                    console.log("Hello World!");
                },
            }
        ]
        return (
            <div>
                <Form>
                    <FormItem label="文章标题">
                        {getFieldDecorator("title", {
                            rules: [
                                { required: false, message: "文章标题" }
                            ],
                        })(
                            <Input placeholder="请输入文章标题" />
                        )}
                    </FormItem>
                    <BraftEditor 
                        onChange={this.handleEditorChange}
                        onSave={this.submitContent}
                        extendControls={extendControls}
                    />
                    <EditableTagGroup/>
                </Form>
                
            </div>
        )
    }
}

export default Form.create()(Editor)