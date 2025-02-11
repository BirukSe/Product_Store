import { sql } from "../config/db.js"

export const getProducts=async(req,res)=>{
    try{
        const products=await sql`
        select * from products order by created_at desc
        
        `;
        res.status(200).json({success:true, data:products})

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal error"})

    }

}
export const createProduct=async(req, res)=>{
    const {name,price,image}=req.body;
    if(!name || !price || !image){
        return res.status(400).json({success:false, message:"All are required"})
    }
    try{
        const newProduct=await sql`
        insert into products (name, price, image) values (${name},${price},${image}) returning *
        
        `;
        res.status(201).json({success:true, data:newProduct[0]})


    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal error"})

    }

}
export const getProduct=async(req, res)=>{
    const {id}=req.params;
    try{
        const product=await sql`
        select * from products where id=${id}
        
        `
        res.status(200).json({success:true, data:product[0]})

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal error"})
    }

}
export const updateProduct=async(req, res)=>{
    const {id}=req.params;
    const {name, price, image}=req.body;
    try{
        const updateProduct=await sql`
        update products set name=${name}, price=${price}, image=${image}
        where id=${id} returning *
        
        `
        if(updateProduct.length===0){
            res.status(404).json({success:false, message: "product not found"})
        }
        res.status(200).json({success:true, data:updateProduct[0]})

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal error"})

    }

}
export const deleteProduct=async(req, res)=>{
    const {id}=req.params;
    try{
        const deletedProduct=await sql`
        delete from products where id=${id} returning *
        
        
        `
        if(deletedProduct.length===0){
            res.status(404).json({success:false, message: "product not found"})
        }
        res.status(200).json({success:true, data:deletedProduct[0]})

    }catch(error){
        console.log(error);
        res.status(500).json({success:false, message:"Internal error"})
    }

}
