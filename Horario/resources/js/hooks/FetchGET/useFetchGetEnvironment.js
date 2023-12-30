import React,{useState} from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';


const useFetchGetEnvironment = () => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataEnvironment, setDataEnvironment] = useState([]);

    const fetchDataEnvironment = async() =>{

        try{
            await fetch(`http://localhost:8000/api/getEnvironments`, requestOptionsGet)
                .then((response) => response.json())
                .then((result) => setDataEnvironment(result))
        } catch(err){
            console.error(`Request Error: ${err}`);
        }
    }


  return({
        dataEnvironment,
        fetchDataEnvironment,
    })

}

export default useFetchGetEnvironment;
