import { Effect } from "dva";
import { Reducer } from "redux";

export interface LoginModelType {
    namespace: "login";
    state: {};
    effects: {
        fetch: Effect;
    };
    reducers: {
        setState: Reducer<{}>;
    }
}

const ArticleModel: LoginModelType = {
    namespace: "login",

    state: {
        userId: "",
        roleId: "",
        email: "",
        token: ""
    },

    effects: {
        * fetch({ payload }, { call, put }) {
            // const res = yield call(qeuryArtile, payload)
            // const { data } = res

            // yield put({
            //     type: "save",
            //     payload: { }
            // })
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