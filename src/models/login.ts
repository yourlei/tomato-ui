import { Effect } from "dva";
import { Reducer } from "redux";
import { message } from "antd";
import { routerRedux } from 'dva/router';
import { loginAPI, getRSAKey } from "@/services/login";
import { setUser, removeUser }  from "@/utils/storage";

export interface LoginModelState {
    userName?: string | null
    userId?:  string | null,
    roleId?:  string | null,
    account?: string | null,
    token?: string | null,
    publicKey?: string | null,
}

export interface ModelType {
    namespace: "login";
    state: LoginModelState;
    effects: {
        fetch: Effect;
        logout: Effect;
        getRsaPublickey: Effect;
    };
    reducers: {
        setState: Reducer<LoginModelState>;
        savePublicKey: Reducer<LoginModelState>;
    }
}

const Model: ModelType = {
    namespace: "login",

    state: {
        userName: null, 
        userId: null,
        roleId: null,
        account: null,
        token: null,
        publicKey: null,
    },

    effects: {
        * fetch({ payload }, { call, put }) {
            const res = yield call(loginAPI, payload)
            const { code, data } = res
            if (code) {
                message.info("登录失败, 账户或密码不正确")
                return
            }
            // 缓存用户信息, token等
            setUser(data)
            // 更新global model isLogin 属性
            yield put({
                type: "global/setState",
                payload: {
                    isLogin: true
                }
            })
            yield put({
                type: "login/setState",
                payload: {
                    ...data
                }
            })
            // 跳转到首页
            yield put(
                routerRedux.replace({
                    pathname: "/",
                    search: ""
                })
            )
        },
        * logout({ payload }, { call, put }) {
            /**
             * 当前的登出方式通过客户端清除localstorage
             * 在token未超时的情况下,客户端登出后, 该token仍然有效
             * 有一定的安全隐患
             */
            removeUser()
            // 更新login状态
            yield put({
                type: "global/setState",
                payload: {
                    isLogin: false
                }
            })
            // 自动刷新当前页面
            location.replace(location.href);
        },
        // 获取RSA公钥
        * getRsaPublickey({ payload }, {call, put}) {
            const res = yield call(getRSAKey, {})
            yield put({
                type: "login/savePublicKey",
                payload: { publicKey: res }
            })
        }
    },

    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                userName: payload.name,
                userId: payload.id,
                token: payload.token
            }
        },
        savePublicKey(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        }
    }
}

export default Model;