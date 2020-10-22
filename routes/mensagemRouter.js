import express from "express";
import nodemailer from "nodemailer";
import smtpTransport  from "nodemailer-smtp-transport";

const mensagemRouter = express();

mensagemRouter.post("/mensagem", (request, response) => {
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


export {mensagemRouter};