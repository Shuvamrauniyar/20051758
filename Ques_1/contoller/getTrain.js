const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;
const headers = {
    Authorization: `Bearer ${token}`,
  };
  const apiURL = 'http://20.244.56.144/train/trains';
const getOrderedTrain = async(req,res) => {
    try {
        const Trains = await axios.get(apiURL,{headers});
        console.log(Trains.data);
        return res.status(200).json({
            message: 'successfully fetched trains',
            data: Trains.data,
            err:{}
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error while fetching',
            data:{},
            err: error
        })
    }
}
module.exports = {
    getOrderedTrain
}