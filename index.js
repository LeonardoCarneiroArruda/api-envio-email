import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import smtpTransport  from "nodemailer-smtp-transport";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.use(express.json()); //indica que vai utilizar objetos no formato json
app.use(cors());

app.post("/mensagem", (request, response) => {
    try {

        const obj = request.query;

        let remetente = nodemailer.createTransport(smtpTransport({
            host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: true,
            auth:{
                user: process.env.USER,
                pass: process.env.PASSWORD 
            }
        }));

        const msg = `<h2>De: ${obj.name}</h2>
                    <h2>E-mail: ${obj.email}</h2>
                    <h2>Telefone: ${obj.phone}</h2>
                    <h2>Mensagem: ${obj.message}</h2>
                    <i>Esta mensagem é gerada automaticamente pela área de CONTATE-NOS do site. Não responder este email.</i>`;  

        let emailASerEnviado = {
                from: process.env.USER,
                to: process.env.USER,
                subject: process.env.ASSUNTO,
                html: msg,
            };


        remetente.sendMail(emailASerEnviado, function(error, info){
            if (error) {
                console.log(error);
            } 
            else {
                console.log("Email enviado com sucesso.");
            }
            });    

        console.log(obj);
        response.send(obj);
    }
    catch(error) {
        response.status(500).send(error);
    }
});

app.get("/", (request, response) => {
    response.send({status: "API para enviar e-mail em pleno funcionamento"});
});

app.listen(3002, async () => {
    console.log("API Started linstening in port " + 3002);
});