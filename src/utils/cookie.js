
/**
 * 将变量储存在cookie中
 * @param {string} c_name 
 * @param {any} value 
 * @param {number} expire 
 */

export function setCookie(c_name,value) {
    window.sessionStorage.setItem(c_name, value);
}


/**
 * 获取cookie
 * @param {string} c_name 
 */
export function getCookie(c_name) {
   return window.sessionStorage.getItem(c_name)
}

export function delCookie(c_name) {
    window.sessionStorage.removeItem(c_name);
}
