import { environment } from "../../environments/environment.development";
import { sleep } from "../helpers/sleep";
import { ICharacter } from "../interfaces/ICharacter";

const URL = environment.url;

export const getCharacter = async (id:string): Promise<ICharacter> => {

    await sleep(2000);

try {

    const response = await fetch(`${URL}/characters/${id}`);
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