import { GetStaticProps } from 'next';

const PolicyPage = ({ policy }) => {
  return (
    <div>
      <h1>Cancellation and Refund Policy</h1>
      <p>{policy}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const policy = "Your detailed cancellation and refund policy goes here.";

  return {
    props: {
      policy,
    },
  };
};

export default PolicyPage;