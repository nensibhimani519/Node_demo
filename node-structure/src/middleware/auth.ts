import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "config";
import { User } from "../models/validation/user";
import { decrypt } from "../helper/encription";

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token: string = req.header("x-auth-token");
        token = await decrypt(token);

        let tokenData: any = jwt.verify(token, config.get("jwtPrivateKey"));
        let _id: string = tokenData.uid ? tokenData.uid : null;
        
        let user: any = await User.findOne({ _id: _id });
        if (!user) res.status(500).json({ message: 'Invalid token data.' });

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Access denied. Invalid token.' });
    }
};