import Prism from 'prismjs'
import { ILocation } from '../position/Position'
import { EElementType } from './types'
import { YElement } from './Element'
import { Draw } from '../render/Draw'
import { YChar } from './Char'
import { log } from '@/lib/tools'

export type TToken = Prism.Token | string

export type TokenList = TToken[]

// 一个 token 可能有多个 char

export class YToken extends YElement {
  private chars: YChar[] = []
  constructor(private token: TToken, loc: ILocation) {
    super(loc)
    this.name = 'YToken'
  }

  // token 的第 i 个 char
  public charAt(index: number) {
    if (index <= this.chars.length) {
      return this.chars[index]
    }
    return undefined
  }

  // 按已有数据生成自己的 chars【要如何保证顺序】
  public genChars() {
    // log(`内容=(${this.content}), 长度=(${this.content.length})`)
    const str = this.content
    // 一个 char 的宽度
    const charW = this.w / str.length
    for (let i = 0; i < str.length; i += 1) {
      const chr = str[i]
      this.chars.push(new YChar(chr, {
        x: this.x + charW * i,
        y: this.y,
        w: charW,
        h: this.h,
      }))
    }
    return this.chars
  }

  get type(): EElementType {
    return typeof this.token === 'string' ? EElementType.STRING : (this.token.type as EElementType)
  }

  get content(): string {
    const t = this.token
    return typeof t === 'string' ? t : t.content as string
  }

  public setTokenWH(draw: Draw): void {
    const w = draw.getCtx()!.measureText(this.content).width
    const h = draw.fontSize
    this.setWH(w, h)
  }

  // token 可以不画，但是 chars 一定要画
  public render(draw: Draw) {
    const { textStyle } = draw.options
    const ctx = draw.getCtx()

    // TODO: 这里拆到 char 里去画
    for (let i = 0; i < this.chars.length; i += 1) {
      const c = this.chars[i]
      // 自己画自己
      const type = this.type
      if (textStyle[type]) {
        ctx.fillStyle = textStyle[type]
      } else {
        ctx.fillStyle = 'black'
      }
      // 画文字
      ctx.fillText(c.content, c.x, c.y + c.h);

      // ctx.strokeRect(c.x, c.y, c.w, c.h)
    }

    // // 自己画自己
    // const type = this.type
    // if (textStyle[type]) {
    //   ctx.fillStyle = textStyle[type]
    // } else {
    //   ctx.fillStyle = 'black'
    // }
    // // 画文字
    // ctx.fillText(this.content, this.x, this.y + this.h);

    // // 画边缘
    // ctx.strokeRect(this.x, this.y, this.w, this.h)
  }
}