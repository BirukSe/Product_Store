import {create} from "zustand";
export const useThemeStore=create((set)=>(
    {
        themee:localStorage.getItem('preferred-theme') || "forest",
        setTheme: (themee)=>{
            localStorage.setItem('preferred-theme', themee)

            set({themee})

        }
           
    }
))