import { BoxHome } from "../../Components/organism";
import { Layout } from "../../Layouts";

export const Home = () => {
  return (
    <Layout>
      <div className="w-full h-screen bg-blue-600 flex items-center justify-center">
        <div className="w-[90%] lg:max-w-[1184px] flex items-center justify-center">
          <BoxHome />
        </div>
      </div>
    </Layout>
  );
};
