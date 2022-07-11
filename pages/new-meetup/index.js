import NewMeetupForm from "../../components/meetups/NewMeetupForm.js";

const NewMeetupPage = () => {
  function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
  }
  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
