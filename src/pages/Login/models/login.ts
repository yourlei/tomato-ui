import { Effect } from "dva";
import { Reducer } from "redux";
import { message } from "antd";
import { routerRedux } from 'dva/router';
import { loginAPI } from "@/services/login";

export interface LoginModelType {
    namespace: "login";
    state: {};
    effects: {
        login: Effect;
        logout: Effect;
    };
    reducers: {
        save: Reducer<{}>;
    }
}

const ArticleModel: LoginModelType = {
    namespace: "login",

    state: {
        userId: "",
        roleId: "",
        account: "",
        token: ""
    },

    effects: {
        * login({ payload }, { call, put }) {
            const res = yield call(loginAPI, payload)
            const { code, data } = res
            
            if (code) {
                message.info("登录失败, 账户或密码不正确")
                return
            }
            // TODO 
            // 缓存用户信息, token
            // 跳转到首页
            yield put(
                routerRedux.replace({
                    pathname: "/article",
                    search: ""
                })
            )
        },
        * logout({ payload }, { call, put }) {
            //
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