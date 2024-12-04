import IAPIResponse from "../interfaces/IApiResponse";

const fetchDataAPI = async<T>(url: string, method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', body?: unknown): Promise<IAPIResponse<T>> => {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        }

        const res = await fetch(url, options);

        if (!res.ok) {
            return {
                data: null,
                error: `Error ${res.status}: ${res.statusText}`,
                status: res.status,
            }
        }

        const data = await res.json();
        return {
            data,
            error: null,
            status: res.status
        }
    } catch (error) {
        return {
            data: null,
            error: error instanceof Error ? error.message : 'Error desconocido',
            status: 500,
        }
    }
}

export default fetchDataAPI;