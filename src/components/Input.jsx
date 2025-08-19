import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input=({label, value, onChange, placeholder, type})=>{
   
    const [showPasssword, setShowPassword] =useState(false);

    const toggleShowPassword= ()=>{
        setShowPassword(!showPasssword);
    }

    return(
        <div className="mb-4">
            <label className="text-[13px] text-slate-800 block mb-1">
                {label}
            </label>
            <div className="relative">
                <input 
                    className="w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                      type={type==="password" ? (showPasssword ? 'text' : 'password') :type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=>onChange(e)}
                />
                {type ==='password' && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                    {
                        showPasssword ? (
                            <Eye size={20} className="text-blue-600" onClick={toggleShowPassword}/>
                        ):
                        <EyeOff size={20} className="text-slate-400" onClick={toggleShowPassword}/>
                    }
                </span>
                )}
                
            </div>
        </div>
    )
}

export default Input;