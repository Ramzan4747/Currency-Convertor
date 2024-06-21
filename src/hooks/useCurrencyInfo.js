import { useEffect, useState } from "react";

function useCurrencyInfo(currency, date = 'latest') {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const primaryURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`;
    const fallbackURL = `https://${date}.currency-api.pages.dev/v1/currencies/${currency}.json`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(primaryURL);
                if (!response.ok) {
                    throw new Error('Primary URL failed');
                }
                const result = await response.json();
                setData(result[currency]);
            } catch (error) {
                console.error('Primary URL failed, trying fallback URL:', error);
                try {
                    let response = await fetch(fallbackURL);
                    if (!response.ok) {
                        throw new Error('Fallback URL failed');
                    }
                    const result = await response.json();
                    setData(result[currency]);
                } catch (error) {
                    console.error('Fallback URL also failed:', error);
                    setError('Failed to fetch currency data');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currency, date]);

    return { data, loading, error };
}

export default useCurrencyInfo;



// function useCurrencyInfo(currency){
//     const [data, setData] = useState({})
//     useEffect(() => {
//         fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
//         .then((res) => res.json())
//         .then((res) => setData(res[currency]))
//         console.log(data);
//     }, [currency])
//     console.log(data);
//     return data
// }

// export default useCurrencyInfo;