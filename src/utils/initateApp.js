import { connectionDB } from "../../DB/connection.js";
import * as allRouter from "../moudels/index.routers.js";
import { globalHandling } from "./errorHandling.js";
import cors from 'cors'

export const initateApp = (app,express) => {
app.use(express.json());
app.use(cors());
app.use('/user',allRouter.userRouter);
app.use('/note',allRouter.noteRouter);
app.all('*',(req,res)=>{
    res.json({message:"not found"})
    })

app.use(globalHandling);
connectionDB();
app.listen(5000, ()=> {
    console.log("listening on port 5000");
  });
};
