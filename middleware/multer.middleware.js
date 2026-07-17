import { existsSync, mkdir } from "fs";
import fs from "fs";
import multer from "multer";
if(!fs.existsSync("uploads")){
    fs.mkdirSync('uploads')
    //if(err){
     //   console.log(err)
   // }
}
const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname);
    }
})
const  upload=multer({storage:storage})
export default upload