/**
 * 登录模块接口
 */
import request from '@/utils/request';
import config from '../../config/defaultSettings';
import { async } from '_@types_q@1.5.2@@types/q';

const { ServerAPI } = config;

export async function loginAPI(params: object): Promise<any> {
    // 后台登录接口
    return request.post(`${ServerAPI}/login`, {
        data: {
            ...params
        }
    })
}

export async function getRSAKey(): Promise<any> {
    return request.get(`${ServerAPI}/rsa/publickey`)
}