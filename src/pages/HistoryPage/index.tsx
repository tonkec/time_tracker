import Timers from '../../components/Timers';
import Layout from '../../components/Layout';

const HistoryPage = () => {
  return (
    <Layout>
      <h1 style={{ marginBottom: 80, fontWeight: 700 }}>Trackers History</h1>
      <Timers hasFilter={true} />
    </Layout>
  );
};

export default HistoryPage;
