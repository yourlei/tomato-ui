import { Effect } from "dva";
import { Subscription } from 'dva';
import { Reducer } from "redux";
import { routerRedux } from "dva/router";
import { message } from "antd";
import { getUser } from "@/utils/storage";
import { create, edite, show } from "@/services/article"

export interface Editor {
    uuid?: string;
    title?: string;
    content?: string;
}

export interface EditorModelState {
    editor?: Editor;
}

export interface EditorModelType {
    namespace: "editor";
    state: EditorModelState;
    effects: {
        // handleCreate: Effect;
        // handleEditor: Effect;
    };
    reducers: {
        setState: Reducer<EditorModelState>;
    }
}

const EditorModel: EditorModelType = {
    namespace: "editor",
    
    state: {
        uuid: "",
        title: "",
        content: "",
    },

    effects: {
        //
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
        // todo
    }
}

export default EditorModel;