import Head from 'next/head';

import { MongoClient } from 'mongodb';

//our-domain.com/
import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList'
const DUMMY_MEETUPS = [
    {
        id: 'm1',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Piazza_della_Signoria.jpg/1280px-Piazza_della_Signoria.jpg',
        title: 'A meetup in Florence',
        address: 'Florence main square'
    },
    {
        id: 'm2',
        image: 'https://images.adsttc.com/media/images/5df7/9613/3312/fdc9/e100/018a/newsletter/001_SFA_Boards_Page_03.jpg?1576506888',
        title: 'A meetup in Sofia',
        address: 'Sofia Sain Nedelya square'
    }, {
        id: 'm3',
        image: 'https://a.cdn-hotels.com/gdcs/production49/d83/192bdabd-f183-43d6-a134-864f629e4048.jpg?impolicy=fcrop&w=800&h=533&q=medium',
        title: 'A meetup in London',
        address: 'London square'
    },
]


function HomePage(props) {

    const [loadedMeetups, setLoadedMeetups] = useState([]);

    useEffect(() => {
        setLoadedMeetups(DUMMY_MEETUPS)
    }, [])

    return (
        <>
            <Head>
                <title>React meetups</title>
                <meta name='description' content='Browse a collection of meetups' />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
};

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//     // fetch data from an API
//     return {
//         props:  {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data from API

    const client = await MongoClient.connect('mongodb+srv://mrsimeonrangelov:maznaparola@cluster0.wgpkfwp.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    client.close()


    return {
        props: {
            meetups: meetups.map((m) => ({
                title: m.title,
                address: m.address,
                image: m.image,
                id: m._id.toString(),
            }))
        },
        revalidate: 10
    }
};


export default HomePage;