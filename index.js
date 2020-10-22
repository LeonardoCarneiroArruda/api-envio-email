import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {mensagemRouter} from "./routes/mensagemRouter.js";
import { parceirosRouter } from "./routes/parceirosRouter.js";
import mongoose from 'mongoose';


const app = express();

dotenv.config();

app.use(express.json()); //indica que vai utilizar objetos no formato json
app.use(cors());

//CONECTAR AO MONGODB
(
    async () => {
        try {
            await mongoose.connect(process.env.DATABASE, {
                useNewUrlParser: true,
                useUnifiedTopology: true
              });            
        }
        catch(error) {
            console.log("Erro ao conectar. " + error)
        }
    }
)();

app.use(mensagemRouter);
app.use(parceirosRouter);

app.get("/", (request, response) => {
    response.send({status: "API para enviar e-mail em pleno funcionamento..."});
});

app.listen(process.env.PORT || 3003, async () => {
    console.log("API Started linstening in port " + process.env.PORT);
});