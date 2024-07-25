import ApiUrl from "@/config/ApiUrl"
import axios from "axios"

export default async (code?: string): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
        const d = code ? code : localStorage.getItem('auth')
        if (!d){
            resolve(false)
        }
        const result = (await axios.post(ApiUrl.CheckAuth,`activation_series=${d}`)).data
        if (result){
            resolve(true)
        }else{
            resolve(false)
        }
    })
    
}