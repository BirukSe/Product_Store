import {create} from 'zustand';
import axios from "axios";
const base="http://localhost:3000"
export const useProductStore=create((set, get)=>({
    products:[],
    loading:false,
    error:null,
    formData: {
        name: "",
        price: "",
        image: "",
    },
    currentProduct:null,
    setFormData: (formData)=>set({formData}),
    addProduct: async(e)=>{
        e.preventDefault();
        set({loading: true})
        try {
            const {formData}=get();
            await axios.post(`${base}/api/products`, formData);
            await get().fetchProducts();
            get().resetForm();
            toast.success("Pruduct added successfully")
            
        } catch (error) {
            toast.error("Something went wrong")

            
        }finally{
            set({loading:false})
        }

    },
    fetchProducts:async()=>{
        set({loading:true})
        try {
            const response=await axios.get(`${base}/api/products`)
            set({products:response.data.data, error:null})
            
        } catch (error) {
            if(error.status==429) set({error: "Rate limit exceeded", products: []});
            else{
                set({error: "Something went wrong, please try again"})
            }

            
        }finally{
            set({loading:false})
        }

    },
    fetchProduct: async(id)=>{
        set({loading: true})
        try{
            const response=await axios.get(`${base}/api/products/${id}`);
            set({
                currentProduct: response.data.data,
                formData: response.data.data,
                error: null,
            })

        }catch(error){
            set({error: "Something went wrong"})
        }finally{
            set({loading: false})
        }
    },
    deleteProduct: async(id)=>{
        set({loading: true});
        try{
            await axios.delete(`${base}/api/products/${id}`);
            set(prev=>({products: prev.products.filter(product=>product.id!==id)}));
            toast.success("Product deleted successfully")
            document.getElementById("add_product_modal").close();

        }catch(error){
            toast.error("Something went wrong");

        }finally{
            set({loading:false})
        }
    }
}))