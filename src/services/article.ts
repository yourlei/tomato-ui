import request from '@/utils/request';
import config from '../../config/defaultSettings';

const { ServerAPI } = config

// 查询文章列表
export async function query(params: object): Promise<any> {
    return request.get(`${ServerAPI}/admin/article?query=${JSON.stringify({ ...params })}`)
}
// 删除文章
export async function delArticle(id: string): Promise<any> {
    return request.delete(`${ServerAPI}/admin/article/${id}`)
}
// 编辑文章
export async function edit(id: string, params: object): Promise<any> {
    return request.put(`${ServerAPI}/admin/article/${id}`, { ...params })
}