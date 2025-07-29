import { environment } from "../../environments/environment.development";
import { ICharacter } from "../interfaces/ICharacter";

const URL = environment.url;

export const getCharacter = async (id:string): Promise<ICharacter> => {

try {

    const response = await fetch(`${URL}/character/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ICharacter = await response.json();
    console.log(data);
    return data;
} catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
    }
    
}