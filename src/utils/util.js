//路由参数为空则去重
export function delNullUrl({url='', data={}}={}){
    let result = url
    for(let i in data) {
        data[i] && (result += (result.indexOf('?')>-1?'&':'?') + i + '=' + data[i])
    }
    return result
}