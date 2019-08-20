/**
 * 文章编辑器
 */
import React from "react";
import { connect } from "dva";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";
import { Input } from "antd"

class Editor extends React.Component<any> {
    /** markdown编辑器 */
    render() {
        return (
            <div>
                <Input placeholder="文章标题"/>
                <BraftEditor />
            </div>
        )
    }
}

export default Editor