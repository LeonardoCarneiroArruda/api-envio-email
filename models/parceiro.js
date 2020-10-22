
import mongoose from 'mongoose';


//criacao do modelo referente a colecao la no banco de dados 
const parceiroSchema = mongoose.Schema({
   description: {
       type: String,
       required: true
   },
   link_wpp: {
       type: String,
       required: true
   },
   link_fb: {
       type: String,
       required: true
   },
   link_insta: {
       type: String,
       required: true
   },
   name_img: {
       type: String,
       required: true
   }
});

//relacionar a colecao com o schema modelo criado
const parceiroModel = mongoose.model('parceiro', parceiroSchema, 'parceiro');

export {parceiroModel};