import { IoLogoInstagram } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import {FiPhoneCall} from "react-icons/fi";
import { TfiLocationPin } from "react-icons/tfi";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { GoMoveToTop } from "react-icons/go";

const Footer = () => {
  return  (
  <footer className="border-t py-8">
    
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 lg:px-0">
            {/*Call Us */}
        <div className="text-center border-r">
            <h3 className="text-lg text-gray-800 mb-2 ">Call us</h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
                
                <a href="tel:+919840435157" target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-300 block text-center">
                    <FiPhoneCall className="h-5 w-5"/>
                </a>
            </div>
        </div>
        {/*Follow Us */}
        <div className="text-center lg:border-r ">
            <h3 className="text-lg text-gray-800 mb-2 ">Follow us</h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
                
                <a href="https://www.instagram.com/mmboutique_collections?igsh=MWdvb2RsbnVuMTI2dQ==" target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-300 block text-center">
                    <IoLogoInstagram className="h-5 w-5"/>
                </a>
                <a href="https://whatsapp.com/channel/0029Vb2fyYdD8SDs820I4024" target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-300 block text-center">
                    <FaWhatsapp className="h-5 w-5"/>
                </a>
            </div>
        </div> 
          {/*location */}
          <div className="text-center border-r">
            <h3 className="text-lg text-gray-800 mb-2 ">Visit Shop</h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
                
                <a href="https://maps.app.goo.gl/tHRHxrQd59FMV6HT9" target="_blank" rel="noopener noreferrer"
                className="hover:text-gray-300 block text-center">
                    <TfiLocationPin className="h-5 w-5"/>
                </a>
            </div>
        </div>
        {/*go to top */}
        <div className="text-center ">
            <h3 className="text-lg text-gray-800 mb-2 ">Go to Top</h3>
            <div className="flex items-center justify-center space-x-4 mb-6">
                
                <a href="#" onclick="window.scrollTo({top: 0, behavior: 'smooth'})"
                className="hover:text-gray-300 block text-center">
                    <GoMoveToTop className="h-5 w-5"/>
                </a>
            </div>
        </div>
    </div>
    {/* Footer Bottom */}
    <div className="  mt-4  border-t border-gray-200 pt-4">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
        © 2025, M.M Boutique. All Rights Reserved.
        </p>
        <p className="text-gray-500 text-sm tracking-tighter text-center">
        created with love by, 
        </p>
        <a href="https://eswaran-jm.github.io/eswar-portfolio/" target="_blank" rel="noopener noreferrer" className="text-gray-500 flex justify-center text-sm tracking-tighter text-center block" > Eswar <FaRegFaceSmileBeam className="mt-1 mr-1 ml-1"/>  click here to know about me.!</a>
    </div>
  </footer>
  )
}

export default Footer;
