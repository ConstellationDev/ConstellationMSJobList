import { backendApi, user_id, user_role } from "@/constants/APIVariables";

const GetAllNominations = async () => {
    try {
        let response = await fetch(backendApi + '/api/getNominations', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
            },
            body: JSON.stringify({
                'role': user_role,
                'id': user_id
            })
        })

        return response.json();
    } catch (error) {
        console.error(error);
    }
}

export default GetAllNominations;