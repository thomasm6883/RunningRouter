import { API_URL } from "./API_URL";

export const changePassword = async (passwords) => {
    const response = await fetch(`${API_URL}/account/change-password`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(passwords),
    });
    return response.json();
};

export const deleteAccount = async () => {
    const response = await fetch(`${API_URL}/account`, {
        method: "DELETE",
    });
    return response.json();
};

export const changeEmail = async (email) => {
    const response = await fetch(`${API_URL}/account/change-email`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(email),
    });
    return response.json();
};
