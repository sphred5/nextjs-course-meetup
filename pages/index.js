import MeetupList from "../components/meetups/MeetupList.js";
import { connectToDatabase, getAllDocuments } from "../lib/db.js";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};
export async function getStaticProps() {
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    return;
  }
  let events;
  try {
    events = await getAllDocuments(client, "meetups", "meetups", {
      _id: -1,
    });
  } catch (error) {
    return;
  }
  client.close();
  return {
    props: {
      meetups: events,
    },
  };
}

export default HomePage;
