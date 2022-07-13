import MeetupList from "../components/meetups/MeetupList.js";
import { connectToDatabase, getAllDocuments } from "../lib/db.js";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="brows a list of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
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
