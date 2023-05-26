import Header from './Header/header';

const Layouts = ({ children }) => {
  return (
    <>
      <Header />
      <div className="block w-full h-full overflow-auto">{children}</div>
    </>
  );
};

export default Layouts;
