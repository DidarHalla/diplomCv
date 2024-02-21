import { CheckRegistr } from "../features/checkRegistr/checkRegistr";
import { Header } from "../header/header";
import { NavPanel } from "../organisms/NavPanel/NavPanel";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <NavPanel />
      <CheckRegistr />
    </>
  );
};
