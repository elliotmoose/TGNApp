import {Platform} from 'react-native';
let isIos = Platform.OS == 'ios' ;

//decides whether it connects to the server locally or at the specified domain
export const [PRODUCTION, DEV, CLEANBUILD,] = ['PRODUCTION', 'DEV', 'CLEANBUILD']

export default {
    local: false,
    isIos : isIos,
    debugMode: DEV,
    domain: ''
}