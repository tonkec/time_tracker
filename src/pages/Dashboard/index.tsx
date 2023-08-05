import Timer from '../../components/Timers';
import Layout from '../../components/Layout';

const Dashboard = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const currentDate = dd + '.' + mm + '.' + yyyy;
  return (
    <Layout>
      <h1 style={{ marginBottom: 80, fontWeight: 700 }}>
        Today ({currentDate})
      </h1>
      <Timer hasFilter={false} />
    </Layout>
  );
};

export default Dashboard;
