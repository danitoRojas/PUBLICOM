import { PublicacionesAPIResponce } from "../../interfaces/publicacion.interface";
import { UserAPIResponse } from "../../interfaces/user";

export async function getPublicaciones(
  title?: string,
  body?: string,
  userId?: number
): Promise<PublicacionesAPIResponce[]> {
  let url = "https://jsonplaceholder.typicode.com/posts";
  const params: string[] = [];

  if (title?.trim())
    params.push(`title_like=${encodeURIComponent(title.trim())}`);
  if (body?.trim()) params.push(`body_like=${encodeURIComponent(body.trim())}`);
  if (userId !== undefined) params.push(`userId=${userId}`); 

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching publicaciones");
  }
  const data: PublicacionesAPIResponce[] = await response.json();
  return data;
}

export async function getUserByUsername(
  username: string
): Promise<UserAPIResponse | null> {
  const url = `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(
    username
  )}`;

  const response = await fetch(url);
  if (!response.ok) {
    console.error(
      "Error fetching user data:",
      response.status,
      response.statusText
    );
    throw new Error("Error fetching user data");
  }
  const users: UserAPIResponse[] = await response.json();
  return users.length > 0 ? users[0] : null;
}
