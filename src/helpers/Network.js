import Config from '../constants/Config';

const domain = Config.local ? (Config.isIos ? "http://127.0.0.1/" : "http://10.0.3.2/") : "https://mooselliot.com/"


let Network = {
    token: null,
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
            let jsonResponse = await response.json();
            return jsonResponse
        }
        catch (error) {
            console.log(url)
            console.log(error)
            
            if(error.code && error.status && error.message)
            {
                throw error;
            }


            throw {
                status: 'NO_INTERNET',
                statusText: 'Connection Failed',
                message: "Please check your Internet connection",
                url: url
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

