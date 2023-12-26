import React,{useState} from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';


export const useFetchGetQuarter = () => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataQuarter, setDataQuarter] = useState([]);

    const fetchDataQuarter = async() =>{

        try{
            await fetch(`http://localhost:8000/getQuarters`, requestOptionsGet)
                .then((response) => response.json())
                .then((result) => setDataQuarter(result))
        }catch(err){
            console.error(`Request Error: ${err}`);
        }
    }

  return (
    {
        dataQuarter,
        fetchDataQuarter,
    }
  )
}

export default useFetchGetQuarter;
