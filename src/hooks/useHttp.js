import { useState, useEffect, useCallback } from "react"


const sendHttpRequest = async (url, config) => {
    try {
        const response = await fetch(url, config);
        const resData = await response.json();

        if (!response.ok) {
            throw new Error(resData.message || 'Something went wrong, failed to send request.');
        }

        return resData;
    } catch (error) {
        throw new Error(error.message || 'Something went wrong, failed to send request.');
    }
}


const useHttp = (url, config, initialData) => {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState( );
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest = useCallback(async (data) => {
        setIsLoading(true);
        try {
            const resData = await sendHttpRequest(url, {...config, body: data})
            setData(resData)
        }
        catch (error) {
            setError(error.message || 'Something went wrong')
        }
        setIsLoading(false)
    }, [url, config])

    const clearData = () => {
        setData(initialData)
    }

    useEffect(() => {
        if (config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest()
        }
    }, [sendRequest]);
    return {
        data,
        error,
        isLoading,
        sendRequest,
        clearData
    }
}

export default useHttp