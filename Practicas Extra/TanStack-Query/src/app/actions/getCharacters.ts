import { environment } from "../../environments/environment";
import { sleep } from "../helpers/sleep";
import { ICharacters } from "../interfaces/ICharacters";

const URL = environment.url;

    await sleep(2000);

export const getCharacters = async (): Promise<ICharacters> => {

try {

    const response = await fetch(`${URL}/characters`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: ICharacters = await response.json();
    console.log(data);
    return data;
} catch (error) {
    console.error('Error fetching characters:', error);
    throw error;
    }
    
}