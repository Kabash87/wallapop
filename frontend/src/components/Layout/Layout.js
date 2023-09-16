import Header from "./Header";

const Layout = ({ title, children }) => {
  return (
    <div>
      <Header />
      <main>
        <h2 className="my-5">{title}</h2>
        {children}
      </main>
      <footer>@ 2023 Mighty Ducks Keepcoding Team</footer>
    </div>
  );
};

export default Layout;
