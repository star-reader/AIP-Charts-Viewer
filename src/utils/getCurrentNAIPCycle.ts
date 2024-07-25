import axios from "axios"
import ApiUrl from "@/config/ApiUrl"

export default async (): Promise<string> => {
    const d = localStorage.getItem('cycle')
    if (!d){
        const cycle = (await axios.get(ApiUrl.Available)).data.available
        localStorage.setItem('cycle', cycle)
        return cycle
    }
    return d
}