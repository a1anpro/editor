// 最小单位，一个字符

import { ILocation } from "../position/Position";
import { YElement } from "./Element";

// token 确定后，就能确定 char

export class YChar extends YElement {
  constructor(private char: string, loc: ILocation) {
    super(loc)
    this.name = 'YChar'
  }

  get content(): string {
    return this.char
  }
}