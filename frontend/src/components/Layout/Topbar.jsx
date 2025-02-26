import { IoLogoInstagram } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa"; 

const Topbar = () => {
  return (
    <div className="bg-rabbit-red z-50 text-white  ">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        
        {/* Desktop View (Hidden on Mobile) */}
        <div className="hidden md:flex items-center z-50 space-x-4">
          
          <a href="https://www.instagram.com/mmboutique_collections?igsh=MWdvb2RsbnVuMTI2dQ==" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
            <IoLogoInstagram className="h-6 w-6" />
          </a>
          
        </div>

        <div className="text-sm text-center flex-grow hidden md:block">
          <span>M.M Boutique & Collections</span>
        </div>

        <div className=" text-sm hidden md:block">
          <a href="https://wa.link/qn6rei" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex">
          <FaWhatsapp className="h-5 w-5" />+91 9840435157
          </a>
        </div>

        {/* Mobile View (Hidden on Desktop) */}
        <div className="flex md:hidden w-full z-50 justify-between items-center">
          <a href="https://www.instagram.com/mmboutique_collections?igsh=MWdvb2RsbnVuMTI2dQ==" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 ">
            <IoLogoInstagram className="h-5 w-5" />
          </a>

          <span className="text-sm font-semibold">M.M Boutique & Collections</span>

          <a href="https://wa.link/qn6rei" className="hover:text-gray-300">
            <FaWhatsapp className="h-5 w-5" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Topbar;
