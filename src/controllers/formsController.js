module.exports = {
    index: async (req,res) =>{
      //  console.log("Controllador",req.user)
        res.status(200).json({status:'OK',message: 'HOLA MUNDO', data: req.user});
    }
}