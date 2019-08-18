import { connect } from "dva";
// import Redirect from "umi/redirect";
import React from "react";
import { Table, Divider, Form } from "antd"
import { ConnectProps, ConnectState, ArticleModelState, } from "@/models/connect";

import SearchForm from "./components/Form"

interface ArticleComponentProps extends ConnectProps {
    article: ArticleModelState;
}

class ArticleComponent extends React.Component<ArticleComponentProps> {
    // constructor(props) {
    //     super(props)
    //     this.state = {

    //     }
    // }
    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: "article/fetch",
            payload: {}
        })
    }
    
    render() {
        const { article: { list, total} } = this.props
        // console.log(article.list, "............render")

        const columns = [
            // {
            //     title: "rowKey",
            //     dataIndex: "id",
            //     key: "id",
            // },
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
                    <a href="">发布</a>
                    <Divider type="vertical" /> 
                    <a href="javascript:;">查看 {record.name}</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">删除</a>
                  </span>
                ),
            },
        ];
        // const dataSource = [
        //     {
        //         "key": 1,
        //         "title": "tomato1.0 系统",
        //         "author": "leiyu",
        //         "category": "编程",
        //         "publish_at": "2019-08-03"
        //     }
        // ]
        return (
            <div>
                <SearchForm
                    handleSubmit={() => {console.log(".......")}}
                />
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={list}
                />
            </div>
        )
    }
}

// const ArticleComponent: React.FC<ArticleComponentProps> = props => {
//     // const { list, total } = article
//     componentDidMount() {

//     }
//     const columns = [
//         {
//           title: "标题",
//           dataIndex: "title",
//           key: "title",
//         },
//         {
//           title: "作者",
//           dataIndex: "author",
//           key: "author",
//         },
//         {
//           title: "分类",
//           dataIndex: "category",
//           key: "category",
//         },
//         {
//             title: "发布时间",
//             dataIndex: "publish_at",
//             key: "publish_at"
//         },
//         {
//             title: '操作',
//             key: 'action',
//             render: (text, record) => (
//               <span>
//                 <a href="">发布</a>
//                 <Divider type="vertical" /> 
//                 <a href="javascript:;">查看 {record.name}</a>
//                 <Divider type="vertical" />
//                 <a href="javascript:;">删除</a>
//               </span>
//             ),
//         },
//     ];
//     const dataSource = [
//         {
//             "key": 1,
//             "title": "tomato1.0 系统",
//             "author": "leiyu",
//             "category": "编程",
//             "publish_at": "2019-08-03"
//         }
//     ]
//     return (
//         <div>
//             <SearchForm
//                 handleSubmit={() => {console.log(".......")}}
//             />
//             <Table 
//                 columns={columns}
//                 dataSource={dataSource}
//             />
//         </div>
//     )
// }

export default connect(({ article }: ConnectState) => ({
    article,
  }))(ArticleComponent);