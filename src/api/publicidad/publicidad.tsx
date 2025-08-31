import { PublicidadAPIResponce } from "../../interfaces/publicidad.interface";

export async function getPublicidades(title?: string, body?: string): Promise<PublicidadAPIResponce[]> {
    let url = "https://jsonplaceholder.typicode.com/posts";
    const params: string[] = [];

    if (title?.trim()) params.push(`title_like=${encodeURIComponent(title.trim())}`);
    if (body?.trim()) params.push(`body_like=${encodeURIComponent(body.trim())}`);

    if (params.length > 0) {
        url += `?${params.join("&")}`; // Construir manualmente la cadena de consulta
    }

    console.log("Fetching URL:", url); // Debugging log to verify the constructed URL

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Error fetching publicidades");
    }
    const data: PublicidadAPIResponce[] = await response.json();
    console.log("Fetched data:", data); // Debugging log to verify the fetched data
    return data;
}
