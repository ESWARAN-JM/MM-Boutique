import { Link } from "react-router-dom";
import aariCollectionImage from "../../assets/aari.webp";
import readymadeCollectionImage from "../../assets/readymade.webp";
import { IoCartOutline } from "react-icons/io5";

const GenderCollectionSection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
            
            <div className="relative flex-1">
                <img src={readymadeCollectionImage} alt="readymade collections"
                className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Readymade Collections
                    </h2>
                    <Link to="/collection/all?category=Salwar%2CGown"
                    className="text-gray-900 flex  underline">
                        Shop Now <IoCartOutline className="mt-1"/>
                    </Link>
                </div>
            </div>
            
            <div className="relative flex-1">
                <img src={aariCollectionImage} alt="aari blouse designs"
                className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Aari work Designs
                    </h2>
                    <Link to="/collection/all?category=Aari Blouse"
                    className="text-gray-900  flex underline">
                        Shop Now <IoCartOutline className="mt-1" />
                    </Link>
                </div>
            </div>
        </div>

    </section>
  )
}

export default GenderCollectionSection
