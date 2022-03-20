import { useState } from 'react';
import { Layout } from 'antd';
import SlideBar from '../../components/layouts/slidebar';

const Home = () => {
  const [isUser, setIsUser] = useState();

  return <section>
    <Layout>
      <SlideBar/>
      
    </Layout>
  </section>;
};

export default Home;
