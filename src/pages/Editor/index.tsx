/**
 * 文章编辑器
 */
import React from "react";
import { connect } from "dva";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { Input } from "antd"

class Editor extends React.Component<any> {
    /** 
     * markdown编辑器 
     * Usage see: https://www.yuque.com/braft-editor/be/mrgy92
     */
    constructor(props) {
        super(props)

        this.state = {
            contextValue: String
        }
    }
    // 存为草稿
    handleSaveToDraft = (e) => {
        // 保存文本
    }
    render() {

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
                <Input placeholder="文章标题"/>
                <BraftEditor 
                    extendControls={extendControls}
                />
            </div>
        )
    }
}

export default Editor