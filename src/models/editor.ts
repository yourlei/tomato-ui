import { Effect } from "dva";
import { Subscription } from 'dva';
import { Reducer } from "redux";
import { getUser } from "@/utils/storage";
import { routerRedux } from "dva/router";
import router from 'umi/router';

export interface Editor {
    id: string;
    userId?: string;
    title?: string;
    author?: string;
    content?: string;
}

export interface EditorModelState {
    editor?: Editor;
}

export interface EditorModelType {
    namespace: "editor";
    state: EditorModelState;
    effects: {
        fetch: Effect;
        generateUrl: Effect;
    };
    reducers: {
        setState: Reducer<EditorModelState>;
    }
}

const EditorModel: EditorModelType = {
    namespace: "editor",
    
    state: {
        id: "",
        userId: "",
        title: "",
        author: "",
        content: "",
    },

    effects: {
        * fetch({ payload }, { call, put }) {
            // const res = yield call(qeuryArtile, payload)
            
        },
        /**
         * 通过用户id,文章id生成url路径
         */
        * generateUrl(_, { call, put }) {
            const session = JSON.parse(getUser())
            const articleId = "546734fkdfd"
            
            router.push(`/editor/${session.id}/${articleId}`)
            // yield put(routerRedux.replace({
            //     pathname: `/editor/${session.id}/${articleId}`,
            //     search: ""
            // }))

        }
    },

    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    },

    subscriptions: {
        setup({ history, dispatch }): void {
        },
    }
}

export default EditorModel;