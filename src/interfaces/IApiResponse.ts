interface IAPIResponse<T> {
    data: T | null,
    error: string | null,
    status: number;
}

export default IAPIResponse;