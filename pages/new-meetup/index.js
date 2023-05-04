import { useRouter } from 'next/router';

//our-domain.com/new-meetup
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
function NewMeetupPage() {

    const router = useRouter();

    async function addMeetupHandler(enteredData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enteredData)
        }); 

        const data = await response.json(); 

        console.log(data);

        router.push('/')
        

    }

    return(
        <>
            <NewMeetupForm onAddMeetup={addMeetupHandler}/>        
        </>
    )
}

export default NewMeetupPage;