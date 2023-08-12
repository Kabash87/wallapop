import Cabecera from "./Cabecera";

const Layout = ({ title, children }) => {
  return (
    <div>
      <Cabecera />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <footer>@ 2023 Mighty Ducks Keepcoding Team</footer>
    </div>
  );
};

export default Layout;
