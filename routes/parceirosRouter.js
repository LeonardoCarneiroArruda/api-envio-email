import express from "express";
import {parceiroModel} from "../models/parceiro.js";

const parceirosRouter = express();

parceirosRouter.get("/parceiros", async (request, response) => {
    try {
        
        const parceiros = await parceiroModel.find({});

        response.send(parceiros);
    }
    catch(error) {
        response.status(500).send(error);
    }
});

parceirosRouter.post("/parceiros", async (request, response) => {
    try {
        
        const parceiroNovo = new parceiroModel(request.body);
        await parceiroNovo.save();

        response.send(parceiroNovo);
    }
    catch(error) {
        response.status(500).send(error);
    }
});


export {parceirosRouter};