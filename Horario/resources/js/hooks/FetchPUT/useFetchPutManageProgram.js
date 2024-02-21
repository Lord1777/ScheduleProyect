import { API_URL, csrf_token } from '../../const/api';


export const useFetchPutManageProgram = () => {

    const userToken = localStorage.getItem('access_token');

    const fetchManageProgram = async(route, idPrograma) => {
        try {
            const response = await fetch(`${API_URL}${route}/${idPrograma}`, {
                method: "PUT",
                headers: { 
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrf_token,
                    'Authorization': `Bearer ${userToken}`,
                 },
            })

            if (response.ok) {
                const data = await response.json();
                console.log(data.message); // Mensaje definido en Laravel
            }
        } catch (error) {
            console.log(`Error Updating Program: ${error}`)
        }
    }
  return (
    {
        fetchManageProgram
    }
  )
}
