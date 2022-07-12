import {
  connectToDatabase,
  getDocument,
  getAllDocuments,
} from "../../lib/db.js";
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
  let client;
  let meetups;
  try {
    client = await connectToDatabase();
  } catch (error) {
    return;
  }

  try {
    meetups = await getAllDocuments(client, "meetups", "meetups", { _id: -1 });
  } catch (error) {
    return;
  }
  const paths = meetups.map((meetup) => ({ params: { meetupId: meetup._id } }));
  return {
    fallback: false,
    paths,
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
