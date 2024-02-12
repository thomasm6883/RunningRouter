import { API_URL } from "./API_URL";

export const login = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export const signup = async (credentials) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
};

export const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
    });
    return response.json();
};