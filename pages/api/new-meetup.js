import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

// this will be the endpoint for creating a new meetup
async function handler(req, res) { // req object contains data on the incomming request while the res object is needed for sending back a response
    if (req.method == 'POST') {
        const data = req.body;

        // const { title, image, address, description } = data;

        //connect returns a Promise
        const client = await MongoClient.connect('mongodb+srv://mrsimeonrangelov:maznaparola@cluster0.wgpkfwp.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();                     

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message: 'meetup inserted'})

    }
}

export default handler;