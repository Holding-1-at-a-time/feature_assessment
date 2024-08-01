import { GetStaticPaths, GetStaticProps } from 'next';
import { getPolicyDetails } from '../../convex/functions';

export const getStaticPaths: GetStaticPaths = async () => {
  const policies = await getPolicyDetails();
  const paths = policies.map(policy => ({ params: { policyId: policy.id } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const policy = await getPolicyDetails(params.policyId);
  return { props: { policy } };
};

const PolicyPage = ({ policy }) => {
  return (
    <div>
      <h1>{policy.title}</h1>
      <p>{policy.content}</p>
    </div>
  );
};

export default PolicyPage;