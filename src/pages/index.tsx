import { Config, Configuration } from "@lib/config";

import { Home } from "../components/Home";

export default function Index(props: Configuration): JSX.Element {
  return <Home {...props} />;
}

export const getServerSideProps = (): Record<string, Configuration> => {
  return {
    props: { authoring: Config.authoring, vertexEnv: Config.vertexEnv },
  };
};
