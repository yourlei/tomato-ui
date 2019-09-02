import { Effect } from "dva";
import { Reducer } from "redux";
import { message } from "antd";
import { query as qeuryArtile, edit, delArticle } from '@/services/article';

export interface Article {
    id?: string;
    title?: string;
    author?: string;
    content?: string;
    category?: string;
    publish_at?: string;
    comment?: string[];
}

export interface ArticleModelState {
    article?: Article;
    list?: Article[];
    total?: 0;
}

export interface ArticleModelType {
    namespace: "article";
    state: ArticleModelState;
    effects: {
        fetch: Effect;
        edit: Effect;
        delArticle: Effect;
    };
    reducers: {
        setState: Reducer<ArticleModelState>;
    }
}

const ArticleModel: ArticleModelType = {
    namespace: "article",
    
    state: {
        article: {},
        list: [],
        total: 0,
    },

    effects: {
        * fetch({ payload }, { call, put }) {
            const res = yield call(qeuryArtile, payload)
            const { code, data, total } = res

            if (code) {
                message.info(res.msg)
                return
            }
            yield put({
                type: "save",
                payload: {list: data, total: total} 
            })
        },
        // 删除文章
        * delArticle({ payload }, { call, put }) {
            const res = yield call(delArticle, payload.id)
            
            yield put({
                type: "fetch"
            })
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    }
}

export default ArticleModel;