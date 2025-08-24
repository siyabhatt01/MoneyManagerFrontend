import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Input=({label, value, onChange, placeholder, type,isSelect,options})=>{
   
    const [showPasssword, setShowPassword] =useState(false);

    const toggleShowPassword= ()=>{
        setShowPassword(!showPasssword);
    }

    return(
        <div className="mb-6">
            <label className="text-sm text-gray-300 block mb-2 font-medium">
                {label}
            </label>
            <div className="relative">

                {isSelect ? (
                    <select className="w-full bg-gray-800 outline-none border-2 border-gray-700 rounded-xl px-4 py-3 text-gray-100 leading-tight focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:border-gray-600"
                    value={value}
                    onChange={(e)=>onChange(e)}>
                            <option value="" disabled className="bg-gray-800 text-gray-100">
                                -- Select a category --
                            </option>
                            {options.map((option) => (
                                <option key={option.value} value={option.value} className="bg-gray-800 text-gray-100">
                                {option.label}
                                </option>
                            ))
                        }
                    </select>
                ) : (
                    <input 
                    className="w-full bg-gray-800 outline-none border-2 border-gray-700 rounded-xl py-3 px-4 pr-12 text-gray-100 leading-tight focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:border-gray-600 placeholder-gray-500"
                      type={type==="password" ? (showPasssword ? 'text' : 'password') :type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e)=>onChange(e)}
                />
                )}

                
                {type ==='password' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer">
                    {
                        showPasssword ? (
                            <Eye size={20} className="text-purple-400 hover:text-purple-300 transition-colors" onClick={toggleShowPassword}/>
                        ):
                        <EyeOff size={20} className="text-gray-500 hover:text-gray-400 transition-colors" onClick={toggleShowPassword}/>
                    }
                </span>
                )}
                
            </div>
        </div>
    )
}

export default Input;