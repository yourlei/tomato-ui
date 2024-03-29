import { connect } from "dva";
import React from "react";
import { Table, Divider, Form, Popconfirm } from "antd";
import { ConnectProps, ConnectState, ArticleModelState, } from "@/models/connect";

import SearchForm from "./components/Form";
import { routerRedux } from "dva/router";

interface ArticleComponentProps extends ConnectProps {
    article: ArticleModelState;
}

class ArticleComponent extends React.Component<ArticleComponentProps> {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: "article/fetch",
            payload: {}
        })
    }
    // 删除文章
    handleDelete = (flag, id) => {
        const { dispatch } = this.props
        dispatch({
            type: "article/delArticle",
            payload: { id: id}
        })
    }
    // 查看文章
    handleEditor= (record) => {
        const { dispatch } = this.props
        dispatch(routerRedux.push({
            pathname: "/editor/kjjjjsfdsfk"
        }))
    }

    render() {
        const { dispatch, article: { list, total } } = this.props

        const columns = [
            {
              title: "标题",
              dataIndex: "title",
              key: "title",
            },
            {
              title: "作者",
              dataIndex: "author",
              key: "author",
            },
            {
              title: "分类",
              dataIndex: "category",
              key: "category",
            }, 
            {
                title: "发布时间",
                dataIndex: "created_at",
                key: "created_at"
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                  <span>
                    <Popconfirm onConfirm={() => this.handleUpdate(true, record.id)}>
                        <a href="">发布</a>
                    </Popconfirm>
                    <Divider type="vertical" /> 
                    {/* <span onClick={() => { this.handleEditor(record) }}>查看</span> */}
                    <a href={`/markdown/editor/${record.id}`} target="_blank">编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm title="是否要删除该文章" onConfirm={() => this.handleDelete(true, record.id)}>
                        <a href="">删除</a>
                    </Popconfirm>
                  </span>
                ),
            },
        ];
        
        return (
            <div>
                <SearchForm dispatch={dispatch}/>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={list}
                />
            </div>
        )
    }
}

export default connect(({ article }: ConnectState) => ({
    article,
  }))(ArticleComponent);