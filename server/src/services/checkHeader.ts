/**
 * To check the header has developer token and owner name 
 * @param context 
 * @returns true/false
 */
export function checkHeader (context:any) {
    if(!context || !context.headers || !context.headers.ownername || !context.headers.developertoken){
        return false;
    }else {
        return true;
    }
}