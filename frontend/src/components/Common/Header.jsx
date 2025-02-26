import Topbar from '../Layout/Topbar';
import Navbar from './Navbar';
const Header = () => {
  return (
    <header className="border-b border-gray-200 fixed top-0 left-0 w-full bg-white shadow-md z-50">
      {/* Topbar*/}
      <div className='z-50'><Topbar /></div>
      {/* navbar*/}
      <div className='z-10'><Navbar /></div>
      {/* Cart Drawer*/}
    </header>
  );
};

export default Header;