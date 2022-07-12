import { connectToDatabase, getDocument } from "../../lib/db.js";
import MeetupDetail from "../../components/meetups/MeetupDetail.js";
const MeetupDetails = ({ meetupData }) => {
  const { image, title, address, description } = meetupData;

  return (
    <MeetupDetail
      image={image}
      title={title}
      address={address}
      description={description}
    />
  );
};

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "62cd16f7a445eaceb609f58a",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  let client;
  let meetup;
  try {
    client = await connectToDatabase();
  } catch (error) {
    return;
  }
  try {
    meetup = await getDocument(client, "meetups", "meetups", meetupId);
    console.log(meetup);
  } catch (error) {
    return;
  }
  return {
    props: {
      meetupData: meetup,
    },
  };
}
export default MeetupDetails;
