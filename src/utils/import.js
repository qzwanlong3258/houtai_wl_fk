
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('@/router/import-' + 'production')

/**
 * @author fjx
 * @param componentPath
 * @return {*|null}
 */
export function importComponent (componentPath = '') {
  return _import(`${componentPath}`) || null
}

/**
 * @author fjx
 * @param componentPath
 * @return {*|null}
 */
export function importModulesComponent (componentPath = '') {
  return _import(`modules/${componentPath}`) || null
}
