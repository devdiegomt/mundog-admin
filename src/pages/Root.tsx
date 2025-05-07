import { Outlet } from "react-router-dom";
import { MainNavigation } from "../components/navigation/MainNavigation";

export const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};
