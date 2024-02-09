
import { API_URL } from './API_URL';

export const getRoutes = async () => {
    const response = await fetch(`${API_URL}/routes`);
    return response.json();
};

export const saveRoute = async (route) => {
    const response = await fetch(`${API_URL}/routes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(route),
    });
    return response.json();
};

export const deleteRoute = async (id) => {
    const response = await fetch(`${API_URL}/routes/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};



