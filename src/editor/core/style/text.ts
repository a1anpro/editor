
// 文本渲染样式
// TODO: 如何更方便的让多个类型 token 使用同一个配色？
export function textStyle(theme: string = 'xonokai') {
  // https://github.com/PrismJS/prism-themes/blob/master/themes/prism-xonokai.css
  return {
    keyword: '#ef3b7d',
    number: '#a77afe',
    function: '#ef3b7d',
    string: '#e6d06c',
    boolean: '#a77afe',
    operator: '#a77afe',
    punctuation: '#bebec5',
    atrule: '#ef3b7d',
    url: '#e6d06c',
    selector: '#a6e22d',
    comment: '#6f705e',
  }
}