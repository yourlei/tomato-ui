import { Effect } from "dva";
import { Reducer } from "redux";
import { query as qeuryArtile } from '@/services/article';
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
        *fetch({ payload }, { call, put }) {
            const response = yield call(qeuryArtile, payload)
            const { code, data, total } = response
            
            yield put({
                type: "save",
                payload: {list: data, total: total} 
            })
        }
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
        // saveCurrentUser(state, action) {
        //     return {
        //         ...state,
        //         currentUser: action.payload || {},
        //     };
        // },
    }
}

export default ArticleModel;