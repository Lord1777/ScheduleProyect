import React from 'react'


const useRequestOptionsPut = () => {

    var myHeaders = new Headers();
    myHeaders.set("Accept", "application/json");

    var requestOptionsPut = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };
    return (
        {
            requestOptionsPut
        }
    )
}

export default useRequestOptionsPut
