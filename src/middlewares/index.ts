import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void
) => {
  // console.log(file.mimetype);
  if (!file.mimetype.includes("csv")) {  
    return cb(new Error("Invalid csv format!"), false);
  }
  cb(null, true);
};


const upload = multer({ storage, fileFilter });

export { upload };