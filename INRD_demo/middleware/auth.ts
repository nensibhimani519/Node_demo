import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/default.json";
import { Customer } from "../models/customer";
import { decrypt } from "../helper/encription";

export const mobileAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
       let token: string = req.headers['x-auth-token'] as string;
       if (!token) return res.status(401).json({ message: "Authentication failed!" });
 
       token = await decrypt(token);
 
       const decodedToken: any = jwt.verify(token, config.jwtPrivateKey);
 
       let _id: string = decodedToken.cid ? decodedToken.cid : null;
       let customer: any = await Customer.findOne({ _id: _id });
       if (!customer) return res.status(401).json({ message: "Authentication failed!" });
       req.body._cid = _id;
       next();
        
    } catch (error) {
       return res.status(401).json({ message: "Authentication failed!" });
    }
};
 