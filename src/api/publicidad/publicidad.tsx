import { PublicidadAPIResponce } from "../../interfaces/publicidad.interface";

export async function getPublicidades(): Promise<PublicidadAPIResponce[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
        throw new Error("Error fetching publicidades");
    }
    const data: PublicidadAPIResponce[] = await response.json();
    return data;
}
