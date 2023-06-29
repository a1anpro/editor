import { ILocation } from '../position/Position'
import { EElementType } from './types'
import { YElement } from './Element'
import { Draw } from '../render/Draw'
import { log } from '@/lib/tools'

const defaultPointer: ILocation = {
  x: 0,
  y: 0,
  w: 0,
  h: 0
}

// 指针
export class YPointer extends YElement {
  constructor(loc: ILocation = defaultPointer) {
    super(loc)
    this.name = 'YPointer'
  }

  public update() {
    // const x = this.x + 5
    // const y = this.y + 5
    // this.setXY(x, y)
  }

  public render(draw: Draw) {
    const ctx = draw.getCtx()

    const size = 5; // 点的大小

    ctx.fillStyle = 'black';

    ctx.fillRect(this.x, this.y, size, size);
  }
}