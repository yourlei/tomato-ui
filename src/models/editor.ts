import { Effect } from "dva";
import { Subscription } from 'dva';
import { Reducer } from "redux";

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
          // Subscribe history(url) change, trigger `load` action if pathname is `/`
          
        },
    }
}

export default EditorModel;