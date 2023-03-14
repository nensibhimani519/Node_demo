import { NextFunction, Request, Response } from "express";
import { encrypt } from "../../../helper/encription";
import { User, validateAuth } from "../../../models/validation/user";

const index = async (req: Request, res: Response, next: NextFunction) => {

    const { error } = validateAuth(req.body);
    if (error) throw error;

    let user: any = await User.findOne({ email_id: req.body.username });
    if(!user) return res.status(400).json({ message: "Invlid username or password! Please try again." });
    if(!user.status) return res.status(400).json({ message: "Your account has been disabled." });

    let password: string = await encrypt(req.body.password);
    if(user.password != password) return res.status(400).json({ message: "Invlid username or password! Please try again." });

    const token = await user.getAccessToken();
    res.status(200).setHeader("x-auth-token", token).json({ message: "User login successfully." });
}

export default { index };