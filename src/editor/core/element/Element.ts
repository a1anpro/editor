import { ILocation } from '../position/Position'
import { Draw } from '../render/Draw'

// 基础类
export class YElement {
  public name: string = 'YElement'

  constructor(private loc: ILocation) {
  }
  /** set */
  // 设置元素宽高
  public setWH(w: number, h: number) {
    this.loc.w = w
    this.loc.h = h
  }

  // 设置坐标
  public setXY(x: number, y: number) {
    this.loc.x = x
    this.loc.y = y
  }

  public get x() {
    return this.loc.x
  }

  public get y() {
    return this.loc.y
  }

  public get w() {
    return this.loc.w
  }

  public get h() {
    return this.loc.h
  }

  // 获取元素的横坐标边界
  public borderX() {
    return this.loc.x + this.loc.w
  }

  public borderY() {
    return this.loc.y
  }

  public render(draw: Draw) {}

  // 更新逻辑
  public update() {}
}