/**
 * Central Logger you can log your data here in case of any data checks
 */
export const loggingMiddleware = {
    // This function will be called for each request
    async requestDidStart(requestContext: any) {
        // console.log('Request received:', requestContext.request);
        // Return an object with a function to be called when the request is completed
        return {
            async willSendResponse(requestContext: any) {
                // console.log('Response sent:', requestContext.response);
            },
        };
    },
};