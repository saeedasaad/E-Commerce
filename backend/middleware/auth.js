import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res.status(401).json({ success: false, message: "No token provided" });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "Invalid token format" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded?.id)
      return res.status(401).json({ success: false, message: "Invalid token payload" });

    const user = await userModel.findById(decoded.id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    req.user = { id: user._id };
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

export default authUser;