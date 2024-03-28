export default async function useQAQuery({query, variables = {}}: {query: string, variables?: any}) {
    const runtimeConfig = useRuntimeConfig();

    const pagesApiEndpoint = `https://raw.githubusercontent.com/comster/bluise/master/${query}.json`;

    const response = await useFetch(pagesApiEndpoint, {
        method: 'GET',
        key: JSON.stringify(
            {
                query
            }
        ),
        headers: {
        },
        retry: 3,
        retryDelay: 1000,
        retryStatusCodes: [408, 409, 425, 429, 500, 502, 503, 504],
        // transform: ({ data, pending, error, refresh }) => {
        //     console.log('transform', data, pending, error, refresh);
        //     if (error) {
        //         throw new error;
        //     }
        //     return data;
        // },
        onRequest({ request, options }) {
        //     // Set the request headers
        //     // options.headers = options.headers || {}
        //     // options.headers.authorization = '...'
            // console.log('on request', request);
        },
        onRequestError({ request, options, error }) {
            // Handle the request errors
            console.log('request error', error);
        },
        // onResponse({ request, response, options }) {
        //     // Process the response data
        //     // localStorage.setItem('token', response._data.token)
        //     console.log('response', response);
        // },
        onResponseError({ request, response, options }) {
            // Handle the response errors
            console.log('response error', response);
        }
    });

    return response.data;
};