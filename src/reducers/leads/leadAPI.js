import axios from 'axios';
import api from '../../config'

const LEAD_APPI = `${api}`;


export const  getLeads  = async() =>{
    try{

        let {data}= await axios.get(`${LEAD_APPI}/leads`)

        return  data.leads
    }
    catch(error){
        throw new Error(error);
    }
}
