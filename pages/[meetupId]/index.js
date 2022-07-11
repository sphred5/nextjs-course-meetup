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
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
      {
        params: {
          meetupId: "m3",
        },
      },
      {
        params: {
          meetupId: "m4",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  return {
    props: {
      meetupData: {
        id: "m1",
        image:
          "https://pocket-syndicated-images.s3.amazonaws.com/5ecea0640d986.jpg",
        title: "A Meetup Title",
        address: "123 fake st",
        description: "a meetup description",
      },
    },
  };
}
export default MeetupDetails;
