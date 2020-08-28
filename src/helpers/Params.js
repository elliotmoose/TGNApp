import { ERROR_MISSING_PARAM } from "../constants/Errors";

export const assertRequiredParams = function(fields) {
    Object.keys(fields).forEach((key)=>{
        if(fields[key] === undefined || fields[key] === null || fields[key] === '')
        {
            throw ERROR_MISSING_PARAM;
        }
    });
}