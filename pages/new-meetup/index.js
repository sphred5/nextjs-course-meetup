import NewMeetupForm from "../../components/meetups/NewMeetupForm.js";
import Head from "next/head";
import { useRouter } from "next/router";

const NewMeetupPage = () => {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const result = await fetch("/api/new-meetup/", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    router.replace("/");
  }
  return (
    <>
      <Head>
        <title>Add New Meetup</title>
        <meta name="description" content="add a new meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </>
  );
};

export default NewMeetupPage;
