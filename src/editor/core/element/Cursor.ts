import { log } from "@/lib/tools";
import { ILocation } from "../position/Position";
import { Draw } from "../render/Draw";
import { YElement } from "./Element";

const defaultLoc: ILocation = {
  x: 200, 
  y: 200,
  w: 5,
  h: 30,
}

// cursor 实例, 让元素自己画自己最好
// 每个元素有自己的坐标和绘画行为
export class Cursor extends YElement {
  private visible: boolean = true

  private high: boolean = false

  private interval: number = 5e2

  // 在所有元素中的下标
  public elIndex: number = 0
  // 在 token 中的下标
  public tIndex: number = 0

  constructor(private drawer: Draw, loc: ILocation = defaultLoc) {
    super(loc)
    this.name = 'Cursor'
  }

  // 聚焦状态
  public focus() {
    this.high = true
  }

  public blink() {
    this.high = false
  }

  private line() {
    this.setWH(this.w, this.drawer.fontSize)
    const ctx = this.drawer.getCtx()
    ctx.beginPath();
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(this.x, this.y + this.h)
    ctx.stroke()
  }

  private block() {
    this.setWH(this.w, this.drawer.fontSize)
    const ctx = this.drawer.getCtx()
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  update() {
  }

  render() {
    if (this.visible) {

      this.line()
      // this.block()

      setTimeout(() => {
        if (!this.high) {
          this.visible = false
        }
      }, this.interval)
    } else {
      setTimeout(() => {
        this.visible = true
      }, this.interval)
    }
  }
}