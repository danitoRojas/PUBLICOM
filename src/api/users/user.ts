import { UserAPIResponse } from "../../interfaces/user";

export async function fetchUsers(): Promise<UserAPIResponse[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }
    return await res.json();
}
