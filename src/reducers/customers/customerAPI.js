import axios from 'axios';
import api from '../../config';

const CUSTOMER_APPI = `${api}`;


export const  getCustomers  = async() =>{
    try{

        let {data}= await axios.get(`${CUSTOMER_APPI}/customers`)

        return  data.customers
    }
    catch(error){
        throw new Error(error);
    }
}
