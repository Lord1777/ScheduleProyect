import React, {useState} from 'react';

export const useFetchGetInstructor = () => {
    const [dataInstructor, setDataInstructor] = useState([]);

    const fetchDataInstructor = async(url) =>{

        var myHeaders = new Headers();
        myHeaders.append("Cookie", "XSRF-TOKEN=eyJpdiI6IkpZSUVSOEtOam5lL0wrcmZxbE43d1E9PSIsInZhbHVlIjoiaVE0Vkw5ZkxmQ0gxVWZIQjlBQWczM3JPQlVkMW9IZCtvbk5wMkZIQXluM2NMb2M2VmdhVVZDQlNMOGtzTUh4R0RLRmRvOGRIVG9aeWJKdjg0UkdZOHRPVnhFOGsxRmNPVGxrK2NqYXI1S3lWLzdQTXVpOXQrV2FiMGdMUjJGeDIiLCJtYWMiOiIyMjcwNTE0ODdlMWM0NjkzYzgyNDE1YjRkNjMzMzRkZTI1YWVkZWMzZjQ3NTdjNmVjMGNkODNhZWE2MmUwZGQ1IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6IkNRazl1K1JiZ0tNeE1kNnRWV1A1dkE9PSIsInZhbHVlIjoidjZTbTZRQXUwdGs2dGN3bk1iYlNZT3Y0Q0haQk9YdzYxVXBsRHM2MlVDbVlDbDF6ajV4QkZ5QWVtcDg0MndtT1BXa29QSDRqb3ZjRmFwNTg5dGwwYWhuUkdxUWhBMXlaV2hSaGJtMWRrN3gwakRXRmF3dHlnc0tsRC9kSHA4d1UiLCJtYWMiOiIxZGQzNzhkOTAzNDQ3MGVjZDM1ZjA3M2MwMWVkYmYyZTAwMzA3M2M1MDRmMjVlMjI0OGY1MWRiZjg4MjA3MTM1IiwidGFnIjoiIn0%3D");

        var requestOptions = {
            method: "GET",
            header: myHeaders,
            redirect: "follow",
        };

        await fetch(`${url}/getInstructors`,requestOptions)
            .then((response) => response.json())
            .then((result) => setDataInstructor(result))
            .then((err) => console.error('request error: ', err));
    }

  return (
    {
        dataInstructor,
        fetchDataInstructor,
    }
  );
}
