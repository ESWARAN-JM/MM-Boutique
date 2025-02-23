import Topbar from '../Layout/Topbar';
import Navbar from './Navbar';
const Header = () => {
  return (
    <header className="border-b border-gray-200 fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* Topbar*/}
      <Topbar />
      {/* navbar*/}
      <Navbar />
      {/* Cart Drawer*/}
    </header>
  );
};

export default Header;