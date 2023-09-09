const CryptoJS = require ('crypto-js');
const config = require ('../config');

module.exports = async(req,res, next)=>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(403).json({status:"Forbidden",message:"Unauthorization"});
    }

    const data = await getUserFecth(authorization);
    if(!data){
        return res.status(403).json({status:"Forbidden",message:"Unauthorization"});
    }
    const decrypt = await get(data.data);

    if(!decrypt){
        return res.status(400).json({status:"failer",message:"bad request"});
    }

    req.user = JSON.parse(decrypt);
    next();
}

async function getUserFecth(authorization){
    return await fetch('http://localhost:3000/API/users',{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization
        }
    }).then((res)=>res.json())
    .catch((err) =>{
        console.log('ERROR',err.message);
        return null;
    });
}

async function get(value) {
    const keys = config.KEY;
    const key = CryptoJS.enc.Utf8.parse(keys);
    const iv = CryptoJS.enc.Utf8.parse(keys);
    const decrypted = CryptoJS.DES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
