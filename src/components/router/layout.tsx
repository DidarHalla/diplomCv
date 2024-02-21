import { CheckRegistr } from "../features/checkRegistr/checkRegistr";
import { NavPanel } from "../organisms/NavPanel/NavPanel";

export const Layout: React.FC = () => {
  return (
    <>
      <NavPanel />
      <br />
      <CheckRegistr />
    </>
  );
};
