import { Link } from "react-router-dom";
import heroImg from "../../assets/banner.webp";
const Hero = () => {
  return (
    <section className="relative">
        <img 
        src={heroImg} 
        alt="Rabbit" 
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 p-6">
            <div className="text-center text-white p-6 ">
                <h1 className="text-white text-6xl md:text-8xl font-extrabold leading-tight drop-shadow-lg">
                Timeless  <br /> Elegance
                </h1>
                <p className="text-white text-lg md:text-2xl mt-4 font-light tracking-wide">
                Find the perfect outfit that defines you...! 
                </p>
                <Link to="/collection/all" >
                <button class="bg-rabbit-red mt-5 hover:bg-green-800 transition duration-300 drop-shadow-lg text-white font-bold py-2 px-4 rounded-full animate-pulse">
                 Shop Now!
                </button>



                </Link>
            </div>
        </div>
    </section>
  )
}

export default Hero;
