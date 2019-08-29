/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { getToken, removeUser } from '@/utils/storage'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    // 登录过期,刷新并跳转到登录页
    if (401 === status) {
        removeUser()
        location.replace("/")
        message.info("登录已失效, 请重新登录")
    }
    // notification.error({
    //   message: `请求错误 ${status}: ${url}`,
    //   description: errorText,
    // });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

/**
 * request拦截器, 改变url 或 options
 */
// request.interceptors.request.use((url, options) => {
//     console.log("request >>>>>>>>>>>>>")
//     return (
//         {
//             url: `${url}&interceptors=yes`,
//             options: { ...options, interceptors: true },
//         }
//     );
// });

/**
 * response拦截器, 处理response 
 */
// request.interceptors.response.use((response, options) => {
//     console.log("response <<<<<<<<<<<<")
//     response.headers.append('interceptors', 'yes yo');
//     return response;
// });

/**
 * Middleware,中间件
 * 添加请求前或响应后的操作, 注意中间件执行流程
 * request.use(async (ctx, next) => {
 *      console.log('a1');
 *      await next();
 *      console.log('a2');
 * })
 * 
 * request.use(async (ctx, next) => {
 *      console.log('b1');
 *      await next();
 *      console.log('b2');
 *  })
 * 
 * 输出: a1 -> b1 -> response -> b2 -> a2
 */
// 中间件，对请求前、响应后做处理
request.use(async (ctx, next) => {
    const { req } = ctx;
    const { url, options } = req;
    // options property: method, params, headers
    // 添加前缀、后缀
    // ctx.req.url = `/api/v1/${url}`;

    // header添加token
    if (url.includes("admin")) {
        ctx.req.options = {
            ...options,
            headers: {
                token: getToken()
            }
        };
    }
    await next();

    const { res } = ctx;
    const { success = false } = res; // 假设返回结果为 : { success: false, errorCode: 'B001' }
    if (!success) {
        // 对异常情况做对应处理
    }
    // 默认返回res, 即接口响应的数据
})

export default request;
