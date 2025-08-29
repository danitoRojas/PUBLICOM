import { ComentarioAPIResponse } from "../../interfaces/comentarios";

export async function fetchComentarios(postId: number): Promise<ComentarioAPIResponse[]> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    if (!response.ok) {
        throw new Error("Error al obtener los comentarios");
    }
    const data: ComentarioAPIResponse[] = await response.json();
    return data;
}
