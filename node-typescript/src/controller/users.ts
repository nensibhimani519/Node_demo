import { Request, Response } from "express";

const homeDetail = (req: Request, res: Response): void => {
  let obj = {
    x: 10,
    y: 20,
  };
  let data = sumData(obj);
  // or
  //   let data = sumData(12, 24);
  res.json({
    message: "Home Page new",
    data: data,
  });
};

interface params {
  x: number;
  y: number;
}

type sumCheck = (x: params) => number;

const sumData: sumCheck = (obj: params) => {
  // or
  // const sumData = (x: number, y: number) => {
  return obj.x + obj.y;
};

export { homeDetail };
