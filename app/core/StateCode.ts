export default {
    OK: { code: 200, message: '请求成功' }, //请求成功
    ERROR: { code: -1, message: '系统错误' }, //系统错误
    PARAMS_ERROR: { code: 501, message: '参数错误' }, //参数错误
    INCORRECT_PERMISSIONS: { code: 403, message: '权限错误' },
    SQL_ERROR: { code: 601, message: '数据库异常' }
}
