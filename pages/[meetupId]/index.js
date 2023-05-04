import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'; 
import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetailsPage(props) {


    // console.log('these are the props we`re looking for', props.meetupData)
    return (
        <>
        <Head>
            <title>{props.meetupData.title}</title>
            <meta name='description' content={props.meetupData.description} />
        </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>

    )
};



export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://mrsimeonrangelov:maznaparola@cluster0.wgpkfwp.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close()

    return {

        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
        fallback: false // if set to false, this means that these are all the paths. any other path will result in a 404.
        // if set to true, nextjs will try to show some page on the screen and not show a 404
    }
}

export async function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;
    console.log(context)

    const client = await MongoClient.connect('mongodb+srv://mrsimeonrangelov:maznaparola@cluster0.wgpkfwp.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) })
    client.close()

    // console.log(meetup)


    return {
        props: {
            meetupData: {
                id: meetupId,
                image: meetup.image,
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
            }
        }
    }
}

export default MeetupDetailsPage;