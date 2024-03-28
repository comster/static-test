export default async function useQAQuery({query, variables = {}}: {query: string, variables?: any}) {
    // console.log('useAlfrudQuery', query, variables);

    const runtimeConfig = useRuntimeConfig();

    const pagesApiEndpoint = `https://raw.githubusercontent.com/comster/bluise/master/test2.json`;

    // console.log('pagesApiEndpoint', runtimeConfig.public.alfrud.site, pagesApiEndpoint);

    const response = await useFetch(pagesApiEndpoint, {
        method: 'GET',
        key: JSON.stringify(
            {
                query
            }
        ),
        headers: {
            // "X-SITE": runtimeConfig.public.alfrud.site,
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

    // return {
    //     data: {
    //         allPages: [
    //             {
    //                 id: '2',
    //                 slug: 'about',
    //                 title: 'About',
    //                 content: 'About content',
    //                 createdAt: '2021-01-01',
    //                 updatedAt: '2021-01-01',
    //             },
    //             {
    //                 id: '3',
    //                 slug: 'contact',
    //                 title: 'Contact',
    //                 content: 'Contact content',
    //                 createdAt: '2021-01-01',
    //                 updatedAt: '2021-01-01',
    //             },
    //         ]
    //     }
    // }

    // // a unique key to ensure that data fetching
    // // can be properly de-duplicated across requests,
    // const key = JSON.stringify({
    //     query,
    //     variables
    // });
    // // read runtime config to get access
    // // to the DatoCMS API Token
    // const runtimeConfig = useRuntimeConfig();
    // // perform the GraphQL request to the
    // // DatoCMS Content Delivery API
    // return useFetch('https://graphql.datocms.com', {
    //     key,
    //     method: 'POST',
    //     headers: {
    //         Authorization: `Bearer ${runtimeConfig.public.datocms.apiToken}`,
    //     },
        // body: {
        //     query,
        //     variables,
        // },
        // transform: ({ data, errors }) => {
        //     if (errors) {
        //         throw new errors;
        //     }
        //     return data;
        // },
    // });
};