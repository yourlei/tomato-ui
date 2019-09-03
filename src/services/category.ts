/**
 * 文章与分类接口
 */
import request from '@/utils/request';
import config from '../../config/defaultSettings';

const { ServerAPI } = config;

export async function bindCategory(params: object): Promise<any> {
    return request.post(`${ServerAPI}/admin/category/relation`, {
        data: {
            ...params
        }
    })
}

export async function unbindCategory(params: object): Promise<any> {
    return request.delete(`${ServerAPI}/admin/category/relation`, {
        data: {
            ...params
        }
    })
}