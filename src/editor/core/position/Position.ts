// 坐标相关
export interface IPosition {
  x: number
  y: number
}

// 坐标类
export interface ILocation extends IPosition {
  row?: number
  col?: number
  w: number
  h: number
}


// export class Position {
//   private 

//   constructor(t: Token) {
//     this.token = t
//   }
// }