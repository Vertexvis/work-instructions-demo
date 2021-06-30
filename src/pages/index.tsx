import { Config, Configuration } from "@lib/config";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("../components/Home"), { ssr: false });

export default function Index(props: Configuration): JSX.Element {
  return <Home {...props} />;
}

export const getServerSideProps = (): Record<string, Configuration> => {
  return {
    props: { authoring: Config.authoring, vertexEnv: Config.vertexEnv },
  };
};
