import { config } from "dotenv"
import express from "express";
import { initateApp } from "./src/utils/initateApp.js";



config({path:'./config/.env'})
const app = express();


initateApp(app,express)



