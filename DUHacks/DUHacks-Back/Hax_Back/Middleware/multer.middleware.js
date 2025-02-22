import multer from "multer";

// Use memory storage instead of disk storage
const storage = multer.memoryStorage(); 

export const uploadOnMulter = multer({ storage });
