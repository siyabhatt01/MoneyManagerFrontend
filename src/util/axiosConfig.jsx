import axios from "axios";

const axiosConfig= axios.create(
    {
        baseURL : BASE_URL,
        headers : {
            "Content-Type" : "application/json",
            Accept : "application/json"
        }
    }
);

// list of endpoints that do not require authorization header
const excludeEndpoints = ["/login", "/register", "/status", "/activate", "/health"];

//request interceptors
axiosConfig.interceptors.request.use((config)=>{
    const shouldSkipToken = excludeEndpoints.some((endpoint)=>{
        config.url?.includes(endpoint)
    });

    if(!shouldSkipToken)
    {
        const accessToken = localStorage.getItem("token");
        if(accessToken)
        {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
},
    (error)=>{
        return Promise.reject(error);
    }
)

//response interceptors

axiosConfig.interceptors.response.use( (response)=>
    {
        return response;
    }, (error)=>{
        if(error.response)
        {
            if(error.response.status ===401)
            {
                window.location.href="/login";
            }
            else if(error.response.status === 500)
            {
                console.error("Server error. Please try again later");
            }
        }
        else if(error.code === "ECONNNABORTED")
        {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
)