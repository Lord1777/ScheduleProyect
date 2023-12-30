import React,{useState} from 'react'
import useRequestOptionsGet from './useRequestOptionsGet';

const useFetchGetRecord = () => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataRecord, setDataRecord] = useState([]);

    const fetchDataRecord = async() =>{

        try{
            await fetch(`http://localhost:8000/api/getRecords`, requestOptionsGet)
                .then((response) => response.json())
                .then((result) => setDataRecord(result))
        } catch(err){
            console.error(`Request Error: ${err}`);
        }
    }


  return({
        dataRecord,
        fetchDataRecord,
    })

}

export default useFetchGetRecord;
