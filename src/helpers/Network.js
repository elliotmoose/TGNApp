import Config from '../constants/Config';

const domain = Config.local ? (Config.isIos ? "http://localhost:8080" : "http://10.0.3.2/") : "https://mooselliot.com/"


let Network = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZjJkNzc3NjI3MzY1YmM1MTY3ZGNkODIiLCJpYXQiOjE1OTY4MTUyMzR9.H5Olylo2PdzhNMS-CcSH5onBMYvMJf78bMwA22-oO3A',
    // token: null,
    async JsonRequest(method, route, body) {
        let url = domain + route;
        //log in to server
        var data = {
            method: method,
            credentials: 'same-origin',
            mode: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'                
            }
        }

        if(this.token)
        {
            data.headers['Authorization'] = `Bearer ${this.token}`;
        }

        if (body) {
            data.body = JSON.stringify(body);
        }

        try {
            let response = await fetch(url, data);
            
            if(response.headers.get('content-length') == '0')
            {
                throw {
                    status: 'EMPTY_RESPONSE',
                }
            }

            let contentType = response.headers.get('content-type');
            if(contentType.includes('application/json'))
            {
                let jsonResponse = await response.json();

                if(jsonResponse.error)
                {
                    throw jsonResponse.error;
                }
                
                return jsonResponse.data;
            }
            else if (contentType.includes('text'))
            {
                let textResponse = await response.text();
                throw {
                    code: response.status,
                    status: 'INVALID_RESPONSE',
                    message: 'The server returned an invalid text response',
                    data: {textResponse}
                }
            }
            else 
            {
                throw {
                    code: response.status,
                    status: 'INVALID_RESPONSE',
                    message: 'The server returned an invalid response',
                    data: {contentType}
                }
            }
        }
        catch (error) {
            if(error.code && error.status && error.message)
            {
                throw error;
            }
            
            if(error.message == 'Network request failed')
            {
                throw {
                    // code: error.
                    status: 'NO_INTERNET',
                    statusText: 'Connection Failed',
                    message: "Please check your Internet connection",
                    data: {url}
                }
            }
            else 
            {
                console.log(error);
            }
        }    
    }
}

export default Network;
// export var JsonRequest = async (method,route,body) => 
// {
//     let url = domain + route;
//     //log in to server
//     var data = {
//         method: method,
//         credentials: 'same-origin',
//         mode: 'same-origin',        
//         headers: {
//             'Accept':       'application/json',
//             'Content-Type': 'application/json',
//             'Authorization': 'mooselliot'
//         }
//     }

//     if(method == 'POST')
//     {     
//         data.body = JSON.stringify(body);
//     }    

//     try
//     {
//         let response = await fetch(url,data);        
//         let jsonResponse = await response.json();
//         return jsonResponse
//     }
//     catch(e)
//     {
//         console.log(url)
//         console.log(e)
        
//         throw {
//             status: 'NO_INTERNET',
//             statusText: 'Connection Failed',
//             message: "Please check your Internet connection",
//             url : url
//         }
//     }    
// }

