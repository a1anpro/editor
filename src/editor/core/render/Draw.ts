import { log } from "@/lib/tools"
import { YElement } from "../element/Element"
import { IPosition } from "../position/Position"
import { YPointer } from "../element/Pointer"
import { Cursor } from "../element/Cursor"
import { YToken } from "../element/Token"

// 画板类，底层是需要替换的
export class Draw {
  // TODO: fontsize 要抽成 style 的类
  public fontSize: number = 12
  public width: number = 500
  public height: number = 500

  // 表示画布的状态
  private keydown: boolean = false
  private fps: number = 1000
  private parentContainer: HTMLDivElement

  // 一个代码模块画布
  private codeContainer: HTMLDivElement

  // 画布 ctx
  private ctx: CanvasRenderingContext2D | undefined

  // 所有需要绘制的元素
  private elementList: YElement[] = []

  public options: any

  // 鼠标焦点
  private pointer: YPointer = new YPointer()

  // 光标
  private cursor: Cursor = new Cursor(this)

  constructor(
    container: HTMLDivElement,
    options: {
      textStyle: any
    },
  ) {
    this.fontSize = 16
    this.parentContainer = container
    this.options = options
    // 往 container 里塞入一个 div 包裹的 canvas
    this.codeContainer = this.createCodeContainer()
    this.createCodeCanvas()

    // 塞入指针
    this.addElement(this.pointer)

    // 塞入光标
    this.addElement(this.cursor)

    // 开始渲染
    this.loop()
  }

  public addElement(e: YElement[] | YElement) {
    if (Array.isArray(e)) {
      this.elementList = this.elementList.concat(e)
    } else {
      this.elementList.push(e)
    }
  }

  /** 基础方法 */
  public getCtx(): CanvasRenderingContext2D {
    return this.ctx!
  }

  /** 内部方法 */
  private clearDraw() {
    this.ctx!.clearRect(0, 0, this.width, this.height)
  }

  private drawBg() {
    // this.ctx!.fillRect(0, 0,)
    this.ctx!.fillStyle = '#ffffff'
    // this.ctx!.fillStyle = '#ffff00'
    this.ctx!.fillRect(0, 0, this.width, this.height);
  }

  private drawElements() {
    this.elementList.forEach((e: YElement) => {
      e.update()
      e.render(this)
    })
  }

  // TODO: 需要移出去
  // 第一个 token, 返回下标
  private firstToken(): number {
    const es = this.elementList
    for (let i = 0; i < es.length; i += 1) {
      const e = es[i]
      if (e.name === 'YToken') {
        return i
      }
    }
    return -1
  }

  // 找到下一个 char
  private nextChar() {

  }

  public loadCursor() {
    // 用第一个位置初始化光标
    const ftIndex = this.firstToken()
    log('第一个 token 下标', ftIndex)

    if (ftIndex !== -1) {
      const cs = this.cursor

      // 光标记录 token 位置
      cs.elIndex = ftIndex
      cs.tIndex = 0

      // 用两个下标计算出 char 的位置
      const chr = (this.elementList[cs.elIndex] as YToken).charAt(cs.tIndex)
      log('当前的 char', chr)
      cs.setXY(chr!.x + chr!.w, chr!.y)
    }
  }

  // 更新画板
  private update() {
    // const cs = this.cursor
    // // cs.setXY(cs.x + 1, cs.y + 1)

    // // 遍历元素，找到 char，设置 char 的左边给光标【太慢了】
    // const es = this.elementList
    // for (let i = 0; i < es.length; i += 1) {
    //   const e = es[i]
    //   if (e.name === 'YToken') {
    //     // 设置坐标
    //     cs.setXY(e.x, e.y)
    //     break
    //   }
    // }
  }

  // 定时渲染画布
  private render() {
    // 清空
    this.clearDraw()

    // 重绘背景
    this.drawBg()

    // 重绘元素
    this.drawElements()
  }

  private loop() {
    // 更新自己
    this.update()

    // 更新元素
    this.render()
    setTimeout(() => {
      this.loop()
    }, 1000 / this.fps)
  }

  private createCodeContainer(): HTMLDivElement {
    const codeContainer = document.createElement('div')
    // pageContainer.classList.add(`${EDITOR_PREFIX}-page-container`)
    codeContainer.style.border = '1px solid black'
    this.parentContainer.append(codeContainer)
    return codeContainer
  }

  register(canvas: HTMLElement) {
    canvas.addEventListener('keydown', (event: any) => {
      const key = event.key

      const cs = this.cursor
      cs.focus()

      log('按建', key)
      const elIndex = cs.elIndex

      if (key === 'ArrowRight') {
        // 获取下一个位置
        /*
          1. 判断下一个 chr 是否超出当前 token 了
              a. 如果超出, 则更新 token 下标
              b. 没超出, 更新 chr 下标
          2. 
        */
        if (elIndex <= this.elementList.length) {
          const e = this.elementList[elIndex] as YToken
          const nextChr = e.charAt(cs.tIndex + 1)
          if (nextChr) {
            log('更新当前 token 的下标')
            cs.tIndex = cs.tIndex + 1
            cs.setXY(nextChr.x + nextChr.w, nextChr.y)
          } else {
            log('跳到下一个 token')
            // TODO: 抽一个 nextToken()
            cs.elIndex += 1
            cs.tIndex = 0
            const newToken = this.elementList[cs.elIndex] as YToken
            const newTokenFirstChr = newToken.charAt(cs.tIndex)
            cs.setXY(newTokenFirstChr!.x + newTokenFirstChr!.w, newTokenFirstChr!.y)
          }
        }
      } else if (key === 'ArrowLeft') {
        // 获取上一个位置
        if (elIndex >= 0) {
          const e = this.elementList[elIndex] as YToken
          const preChr = e.charAt(cs.tIndex - 1)
          if (nextChr) {
            log('更新当前 token 的下标')
            cs.tIndex = cs.tIndex + 1
            cs.setXY(nextChr.x + nextChr.w, nextChr.y)
          } else {
            log('跳到下一个 token')
            // TODO: 抽一个 nextToken()
            cs.elIndex += 1
            cs.tIndex = 0
            const newToken = this.elementList[cs.elIndex] as YToken
            const newTokenFirstChr = newToken.charAt(cs.tIndex)
            cs.setXY(newTokenFirstChr!.x + newTokenFirstChr!.w, newTokenFirstChr!.y)
          }
        }
      }
    })

    canvas.addEventListener('keyup', (event: any) => {
      this.cursor.blink()
    })

    canvas.addEventListener('click', (event: any) => {
      const rect = canvas.getBoundingClientRect(); // 获取画布相对于视口的位置
      const x = event.clientX - rect.left * (this.width / rect.width); // 计算相对于画布的 X 坐标
      const y = event.clientY - rect.top * (this.height / rect.height); // 计算相对于画布的 Y 坐标

      // const x = event.clientX
      // const y = event.clientY
      log('点击坐标 (x, y):', x, y);
      this.pointer.setXY(x, y)
      this.cursor.setXY(x, y)
    })
  }

  // 创建 canvas 画布
  private createCodeCanvas() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!

    canvas.style.width = `${this.width}px`
    canvas.style.height = `${this.height}px`

    canvas.style.border = '1px solid red'
    canvas.style.display = 'block'

    // TODO: 调整分辨率
    const dpr = window.devicePixelRatio
    canvas.width = this.width * dpr
    canvas.height = this.height * dpr

    canvas.focus()
    // TODO: 为了聚焦!
    canvas.tabIndex = 0

    // 设置指针样式
    // canvas.style.cursor = 'text'

    // https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-family 字体
    ctx.font = `${this.fontSize}px monospace`

    // TODO:
    ctx.scale(dpr, dpr)

    // ctx.fillText("Hello World", 0, this.fontSize)

    // TODO:
    // canvas.style.marginBottom = `${this.getPageGap()}px`
    // canvas.setAttribute('data-index', String(pageNo))

    this.codeContainer.append(canvas)
    this.ctx = ctx

    this.register(canvas)
  }

  // private _initCodeContext(ctx: CanvasRenderingContext2D) {
  //   const dpr = window.devicePixelRatio
  //   ctx.scale(dpr, dpr)
  //   // 重置以下属性是因部分浏览器(chrome)会应用css样式
  //   // ctx.letterSpacing = '0px'
  //   // ctx.wordSpacing = '0px'
  //   ctx.direction = 'ltr'
  // }
}