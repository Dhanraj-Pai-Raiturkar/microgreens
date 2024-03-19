import express from 'express'

const productRoutes = express.Router()

productRoutes.get("/", async (req, res) => {
    try{
        res.status(200).json({message:"ok"})
    }catch(error){
        console.error("error", error);
    }
})

export default productRoutes