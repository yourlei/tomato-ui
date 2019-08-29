import request from '@/utils/request';
import config from '../../config/defaultSettings';

const { ServerAPI } = config

export async function loginAPI(params: object): Promise<any> {
    // 后台登录接口
    return request.post(`${ServerAPI}/login`, {
        data: {
            ...params
        }
    })
}