import React, { useState } from 'react';
import useRequestOptionsGet from './useRequestOptionsGet';


const useFetchGetCoordinator = () => {

    const { requestOptionsGet } = useRequestOptionsGet();
    const [dataCoordinator, setDataCooordinator] = useState([]);

    const fetchDataCoordinator = async () => {

        try {
            await fetch(`http://localhost:8000/api/getCoordinators`, requestOptionsGet)
                .then((response) => response.json())
                .then((result) => setDataCooordinator(result));
        } catch (err) {
            console.error(`Request Error: ${err}`);
        }
    }

    return (
        {
            dataCoordinator,
            fetchDataCoordinator,
        }
    )
}

export default useFetchGetCoordinator;
