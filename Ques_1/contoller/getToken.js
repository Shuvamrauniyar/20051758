const axios = require('axios');

const getToken = async()=>{
    const apiURL = 'http://20.244.56.144/train/auth';

    const reqBody = {
        "companyName": "Train Central",
        "clientID": "3d358fec-08bb-42f9-a5f9-746fdf0201da",
        "ownerName": "Shuvam",
        "ownerEmail": "shubhamrauniyar48@gmail.com", 
        "rollNo": "20051758",
        "clientSecret": "RhEbbvlLkCbvOlRr"
    }

    const response = await axios.post(apiURL, reqBody);

    const TOKEN = response.data.access_token;
    console.log('token = ',TOKEN);
    //return 
    return TOKEN;
}
module.exports = {
    getToken
}



