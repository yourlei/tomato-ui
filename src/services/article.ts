import request from '@/utils/request';
import config from '../../config/defaultSettings';

const { ServerAPI } = config
// 查詢文章列表
export async function query(params): Promise<any> {
    return request.get(`${ServerAPI}/admin/article?query=${JSON.stringify({ ...params })}`)
}