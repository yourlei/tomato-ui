/**
 * markdown编辑器
 */
import React from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { Form, Input, message, Tag, Tooltip, Icon } from "antd";
import { WrappedFormUtils } from "antd/es/form/Form";
import { ConnectState, } from "@/models/connect";
import { create, edite, show } from "@/services/article";
import { bindCategory, unbindCategory } from "@/services/category";
import { getUser } from "@/utils/storage";

export interface FormUtil {
    form?: WrappedFormUtils;
}

class Editor extends React.Component<FormUtil, any> {
    /** 
     * markdown编辑器 
     * Usage see: https://www.yuque.com/braft-editor/be/mrgy92
     */
    constructor(props) {
        super(props);
    }
    state = {
        uuid: "",
        title: "",
        // 创建一个空的editorState作为初始值
        editorState: BraftEditor.createEditorState(""),
        tags: [],
        inputVisible: false,
        inputValue: "",
    }
    async componentDidMount() {
        const { dispatch, editor } = this.props;
        /** 
         * 根据进入编辑器页面的url区分是新建/编辑文章
         * 新建文章url: /markdown/editor?action=1
         * 编辑文章url: /markdown/editor/754a697658a272e7
         */ 
        const actionType = location.href.includes("action");
        if (actionType) {
            // 创建文章
            const res = await create({
                title: new Date().toLocaleDateString(),
                author_id: getUser("id"),
                status: 2,
                content: "",
            })
            const {code, msg, data} = res;
            if (code) {
                message.info(msg);
                return;
            }
            this.setState({
                uuid: data.id,
                title: new Date().toLocaleDateString()
            })
            // 更新url为编辑模式
            dispatch(routerRedux.push({
                pathname: `/markdown/editor/${data.id}`
            }))
        } else {
            const id = (location.pathname.split("/")).pop();
            const articleInfo = await show(id);
            const {code, msg, data} = articleInfo;
            if (code) {
                message.info(msg);
                return;
            }
            // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
            this.setState({
                uuid: id,
                title: data.title,
                editorState: BraftEditor.createEditorState(data.content)
            })
        }

    }
    // 保存编辑器内容
    submitContent = async () => {
        const { form: {validateFields} } = this.props;
        const htmlContent = this.state.editorState.toHTML();

        validateFields( async(err, value) => {
            if (err) return;
            const fieldValue = { ...value };
            const res = await edite(this.state.uuid, {
                title: fieldValue.title, 
                content: htmlContent
            })

            if (res.code === 0) {
                message.info("保存成功");
            }
        })
    }
    handleEditorChange = (editorState) => {
        this.setState({ 
            editorState: editorState
        })
    };
    // 删除标签
    handleCloseTag = async (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.setState({ tags });

        await unbindCategory({name: removedTag, aid: this.state.uuid})
    };
    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };
    // 添加分类
    handleInputConfirm = async () => {
        const { inputValue } = this.state;
        let { tags, uuid } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: "",
        });
        await bindCategory({name: inputValue, aid: uuid});
    };
    
    saveInputRef = input => (this.input = input);

    render() {
        const {
            dispatch,
            form: {
                getFieldDecorator
            },
        } = this.props;
        const { tags, inputVisible, inputValue } = this.state;
        const FormItem = Form.Item;
        const extendControls = [
            "separator",
            {
                key: "btn-save", // 控件唯一标识，必传
                type: "button",
                title: "保存文章",
                className: "",
                html: "<strong>保存文章</strong>",
                text: "保存文章",
                onClick: () => {
                    this.submitContent()
                },
            },
            "separator",
            {
                key: "btn-publish", // 控件唯一标识，必传
                type: "button",
                title: "发布文章",
                className: "",
                html: "<strong>发布文章</strong>", 
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
                            initialValue: this.state.title
                        })(
                            <Input placeholder="请输入文章标题" style={{"fontSize": "18px"}}/>
                        )}
                    </FormItem>
                    <BraftEditor 
                        onChange={this.handleEditorChange}
                        onSave={this.submitContent}
                        extendControls={extendControls}
                        value={this.state.editorState}
                    />
                </Form>
                {/* 渲染文章标签 */}
                <div>
                    {tags.map((tag, index) => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        // closable={index !== 0}
                        <Tag key={tag} closable={true} onClose={() => this.handleCloseTag(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                        </Tag>
                    );
                    return isLongTag ? (
                        <Tooltip title={tag} key={tag}>
                        {tagElem}
                        </Tooltip>
                    ) : (
                        tagElem
                    );
                    })}
                    {inputVisible && (
                        <Input
                            ref={this.saveInputRef}
                            type="text"
                            size="small"
                            style={{ width: 78 }}
                            value={inputValue}
                            onChange={this.handleInputChange}
                            // onBlur={this.handleInputConfirm}
                            onPressEnter={this.handleInputConfirm}
                        />
                    )}
                    {!inputVisible && (
                        <Tag onClick={this.showInput} style={{ background: "#fff", borderStyle: "dashed" }}>
                            <Icon type="plus" /> New Tag
                        </Tag>
                    )}
                </div>
            </div>
        )
    }
}

export default connect(({ editor }: ConnectState) => ({
    editor,
}))(Form.create()(Editor))