/**
 * markdown编辑器
 */
import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { Form, Input, message } from "antd";
import { WrappedFormUtils } from "antd/es/form/Form";
import { ConnectState, } from "@/models/connect";
import EditableTagGroup from "./components/MyTag";
import { create, edit, query, show } from "@/services/article";
import { getUser } from "@/utils/storage"

export interface FormUtil {
    form?: WrappedFormUtils;
}

class Editor extends React.Component<FormUtil, any> {
    /** 
     * markdown编辑器 
     * Usage see: https://www.yuque.com/braft-editor/be/mrgy92
     */
    constructor(props) {
        super(props)
    }
    state = {
        // 当前编辑的文章uuid
        uuid: "",
        title: "",
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(""),
    }
    async componentDidMount () {
        const { dispatch } = this.props 
        const actionType = location.href.includes("action")
        // 编辑文章
        if (!actionType) {
            const id = (location.pathname.split("/")).pop()
            const articleInfo = await show(id)
            const {code ,data} = articleInfo
            // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
            if (data) {
                this.setState({
                    uuid: id,
                    title: data.title,
                    editorState: BraftEditor.createEditorState(data.content)
                })
            }
        } else {
            // 创建文章
            const res = await create({
                title: new Date().toLocaleDateString(),
                author_id: getUser("id"),
                status: 2,
                content: "",
            })
            const {code, error: {msg}, data} = res
            if (code) {
                message.info(msg)
                return
            }
            this.setState({
                uuid: data.id,
                title: new Date().toLocaleDateString()
            })
            dispatch(routerRedux.push({
                pathname: `/markdown/editor/${data.id}`
            }))
        }

    }
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
        if (!title) {
            message.info("标题不能为空")
            return
        }

        const res = await edit(this.state.uuid, {title, content: htmlContent})
        
        if (res.code === 0) {
            message.info("保存成功")
        }
    }
    // 检查文章是否已存在
    hadArticle = async (title, author) => {
        const res = await query({
            where: {
                title, 
                author
            }
        })

        return res
    }
    handleEditorChange = (editorState) => {
        this.setState({ 
            editorState: editorState 
        })
    }
    render() {
        const {
            title,
            editorState
        } = this.state
        const { 
            form: {
                getFieldDecorator
            },
        } = this.props
        const FormItem = Form.Item;
        const extendControls = [
            "separator",
            {
                key: "btn-save", // 控件唯一标识，必传
                type: "button",
                title: "保存文章", // 指定鼠标悬停提示文案
                className: "my-button", // 指定按钮的样式名
                html: "<strong>保存文章</strong>", // 指定在按钮中渲染的html字符串
                text: "保存文章",
                onClick: () => {
                    this.submitContent()
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
                <Form style={{"overflow": "hidden"}}>
                    <FormItem >
                        {getFieldDecorator("title", {
                            rules: [
                                { required: true, message: "请输入文章标题" }
                            ],
                            initialValue: title
                        })(
                            <Input placeholder="请输入文章标题"/>
                        )}
                    </FormItem>
                    <BraftEditor 
                        onChange={this.handleEditorChange}
                        onSave={this.submitContent}
                        extendControls={extendControls}
                        value={editorState}
                    />
                    <EditableTagGroup/>
                </Form>
                
            </div>
        )
    }
}

export default connect(({ editor }: ConnectState) => ({
    editor,
}))(Form.create()(Editor))