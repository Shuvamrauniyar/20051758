const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');

const token = process.env.TOKEN;
const headers = {
    Authorization: `Bearer ${token}`,
  };

const apiURL = 'http://20.244.56.144/train/trains';

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
        let Trains = await axios.get(apiURL,{headers});

    //    Trains= Json.stringify(Trains);
       
        //console.log(Trains.data);
        console.log('-------------------------')
        console.log('-------------------------')
        console.log('-------------------------')
        console.log('-------------------------')
        console.log('-------------------------')
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