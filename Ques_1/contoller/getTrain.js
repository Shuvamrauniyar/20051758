const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const {getToken} = require('./getToken');

async function sortTrains(trains) {
    try {
      // Sort the trains based on price in ascending order
      await trains.sort((train1, train2) => train1.price.sleeper - train2.price.sleeper);
  
      // Sort the trains based on tickets in descending order
      await trains.sort((train1, train2) => {
        const ticketsA = train1.seatsAvailable.sleeper + train1.seatsAvailable.AC;
        const ticketsB = train2.seatsAvailable.sleeper + train2.seatsAvailable.AC;
        return ticketsB - ticketsA;
      });
  
      // Sort the trains based on departure time in descending order
     await trains.sort((train1, train2) => {
        const departureTimeA = new Date(0, 0, 0, train1.departureTime.Hours, train1.departureTime.Minutes + train1.delayedBy, train1.departureTime.Seconds);
        const departureTimeB = new Date(0, 0, 0, train2.departureTime.Hours, train2.departureTime.Minutes + train2.delayedBy, train2.departureTime.Seconds);
        return departureTimeB - departureTimeA;
      });
  
      // Print the sorted trains
      console.log('---------------')
      console.log(trains);
  
      // You can return the sorted trains if needed
      return trains;
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }

const getOrderedTrain = async(req,res) => {
    try {
         //the expiry of token was very less so for interval of some time i needed to again authenticate the user , so only fo temporary, i embeded the auth api here 
         //itself to get the new token and fetch the flight 
            const token =  await getToken();
            console.log(token);

            const headers = {
                Authorization: `Bearer ${token}`,
            };

          const apiURL = 'http://20.244.56.144/train/trains';
           let Trains = await axios.get(apiURL,{headers});

        //console.log(Trains.data);
        console.log('-------------------------')

        const sortedTrains = await sortTrains(Trains.data);
        console.log('sortedtrain list-----',sortedTrains);
        return res.status(200).json({
            message: 'successfully fetched trains',
            data: sortedTrains,
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