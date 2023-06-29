import { createApp } from "vue"
import App from "./App.vue"
const app = createApp(App)
app.mount("#app")

// 在 canvas 里自己画图
import { Draw } from "@/editor/core/render/Draw"
import { log } from "./lib/tools"
import prism from 'prismjs'
import { textStyle } from "./editor/core/style/text"
import { TToken, TokenList, YToken } from "./editor/core/element/Token"
import { Cursor } from "./editor/core/element/Cursor"

// 创建 div 包裹容器
function wrapContainer(rootContainer: HTMLElement): HTMLDivElement {
  const container = document.createElement('div')
  rootContainer.append(container)
  return container
}

function main() {
  // 1. 初始化编辑器
  const container = document.querySelector<HTMLDivElement>('.editor')!
  log('执行 main', container)

  // 外部容器
  const rootContainer = wrapContainer(container)

  // 画板
  const draw = new Draw(rootContainer, {
    textStyle: textStyle(),
  })

  // 内容
  const e = `\tconst a = 123;
  const b = 456;
  `
  const tokens: TokenList = prism.tokenize(e, prism.languages.javascript)

  log('分词', tokens)

  const lines: TokenList[] = []
  let line: TokenList = []


  // 计算行数
  tokens.forEach((t: TToken) => {
    if (typeof t === 'string' && t.includes('\n')) {
      lines.push(line)
      line = []
    } else {
      const token = typeof t === 'string' ? t.trim() : t
      if (token) {
        line.push(token)
        // 每个字符后面塞入一个空格
        line.push(' ')
      }
    }
  })

  log('行', lines)

  // 这里没办法拿到宽高数据，先只算出坐标信息和占位信息

  // 计算分词的定位
  const startX = 0
  const startY = 0

  // 计算每个分词的宽度
  const computedTokens: YToken[] = []
  let cursor = 0

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i]
    for (let j = 0; j < rawLine.length; j += 1) {
      const e = new YToken(rawLine[j], {
        row: i,
        col: j,
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      })
      // 计算 token 宽高
      e.setTokenWH(draw)

      // 计算 token 坐标
      if (cursor === 0) {
        // 第一行第一个位置
        e.setXY(startX, startY)
      } else {
        // 上一个元素
        const pre = computedTokens[cursor - 1]
        // 计算坐标
        if (j) {
          e.setXY(pre.borderX(), pre.borderY())
        } else {
          // 行首
          e.setXY(startX, pre.borderY() + pre.h)
        }
      }

      // 一个 token 完成，开始算 token 的 char
      e.genChars()

      computedTokens.push(e)
      cursor += 1
    }
  }

  log('计算后的 tokens', computedTokens)

  // 加到画板里
  draw.addElement(computedTokens)

  // 这是第一次加载完成，在这里初始化光标
  draw.loadCursor()
}

window.onload = function () {
  main()
}
