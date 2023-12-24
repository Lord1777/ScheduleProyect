import React,{useState} from 'react'

const useFetchGetEnvironment = () => {

    const [dataEnvironment, setDataEnvironment] = useState([]);

    const fetchDataEnvironment = async() =>{

        const myHeaders = new Headers();
        myHeaders.append('Cookie', "XSRF-TOKEN=eyJpdiI6IjNQUExMMEJueUNYZk5vbzZBTEhDdnc9PSIsInZhbHVlIjoiclUySmxBaHFJZENZNi9vbXV5WVhnOUZCZXFzakI0VDd1alY5QUpndTR5ZTJZOFhVVU9xc3dqQ1JjMkx4bFpmSExyd2hWTmhmMURZN3Q0ZnMzRmtpV2NjajlxTzJYNFd4Mk1LNkVFeXN1OHE4djl4OWFocGZFc2lLNEpzSWllTngiLCJtYWMiOiI4OWFiZTdjN2JhNThiNGQyOGFiMmJjMzcyMzk4NzIzOWZjMTJlOGYxZDM3MzU1ODQ2ZGRiNTdjYTBmZWE5MjNkIiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Iko1aWFNMm43bzRjM1ltQUVHUmlMNkE9PSIsInZhbHVlIjoiZUdFaFJla1VUbTQ2amFnUFdFSXg4aTI2MGNnN2pHdlQzOVU3RzhlTWtRbS9VdCtZYlk5M0xEcFdHV21IYjJrQjczQS9JdUw5dlAyZjdiLytGVWY4VllmbVlIOHdOajRFWXBHK2JnZmR1NlNKc0huMlkvTWVWVVZxelYyby9pWW0iLCJtYWMiOiJjYmNlOGM2ZjFmZTMyMDE0YmUxYzI5ZmRiMjBjNTdlM2NhNTI4MGRmNTYyMGM3MmJkYmMyNDc2NWE0MzI0NTgyIiwidGFnIjoiIn0%3D");

        var requestOptions = {
            method:"GET",
            headers: myHeaders,
            redirect: 'follow',
        };

        try{
            await fetch(`http://localhost:8000/getEnvironments`, requestOptions)
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
