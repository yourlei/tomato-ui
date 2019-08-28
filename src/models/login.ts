import { Effect } from "dva";
import { Reducer } from "redux";
import { message } from "antd";
import { routerRedux } from 'dva/router';
import { loginAPI } from "@/services/login";
import { setUser }  from "@/utils/storage";

export interface LoginModelState {
    userId?:  string | null,
    roleId?:  string | null,
    account?: string | null,
    token?: string | null
}

export interface ModelType {
    namespace: "login";
    state: LoginModelState;
    effects: {
        fetch: Effect;
        logout: Effect;
    };
    reducers: {
        save: Reducer<LoginModelState>;
    }
}

const Model: ModelType = {
    namespace: "login",

    state: {
        userId: null,
        roleId: null,
        account: null,
        token: null
    },

    effects: {
        * fetch({ payload }, { call, put }) {
            const res = yield call(loginAPI, payload)
            const { code, data } = res
            if (code) {
                message.info("登录失败, 账户或密码不正确")
                return
            }
            // TODO 
            // 缓存用户信息, token等
            setUser(data)
            // 更新global isLogin
            yield put({
                type: "global/setState",
                payload: {
                    isLogin: true
                }
            })
            // 跳转到首页
            yield put(
                routerRedux.replace({
                    pathname: "/article",
                    search: ""
                })
            )
        },
        // * logout({ payload }, { call, put }) {
        //     //
        // }
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

export default Model;