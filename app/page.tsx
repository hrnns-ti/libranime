import Navbar from "@/components/common/Navbar";
import Image from "next/image";

export default async function Home() {

  // MAIN FETCH
  // const data = await fetch('https://api.jikan.moe/v4/anime')
  // const post = await data.json()

  const [ dataTopAnime, dataTopChara ] = await Promise.all([
    fetch('https://api.jikan.moe/v4/top/anime?limit=7'),
    fetch('https://api.jikan.moe/v4/top/characters')
  ])
  
  const [ postTopAnime, { data: allChar }] = await Promise.all([
    dataTopAnime.json(), dataTopChara.json()
  ])

  // RANDOM TOP CHARACTER
  const randomCharIndex = Math.floor(Math.random() * allChar.length);
  const finalChar = allChar[randomCharIndex];

  return (
    <>
      <Navbar />

      {/* SECTION 1 */}
      <section className="relative w-full h-1/2 flex">
        {/* HEADLINE */}
        <div className="select-none px-4"> 
           <h1 className="text-[#000000] mx-8 my-4 gap-4 text-8xl font-light">
            <span className="text-[#5DA8FB]">Libranime</span>
            <span className="inline-block align-middle mx-8 w-40 h-18 overflow-hidden rounded-full">
              <Image 
                src={finalChar.images.jpg.image_url} 
                alt={finalChar.name}
                width={40}
                height={18}
                priority
                unoptimized={true} 
                className="w-full h-full object-cover object-center"
              />
            </span>
            Your Open Digital Anime Library
          </h1>
        </div>
      </section>
      

      {/* SECTION 2 */}
      <section className=" relative w-full h-auto flex justify-center">
        <div className="m-12">
          <h2 className="font-semibold text-2xl my-4">Trending</h2>
          <div className="grid grid-cols-7 gap-6 w-full">
            {/* @ts-ignore */}
            {postTopAnime.data.slice(0, 7).map((anime) => (
              <div key={anime.mal_id} className="w-full">
                
                {/* PICTURE */}
                <div className="rounded-lg overflow-hidden aspect-3/4">
                  <img src={anime.images.jpg.image_url} alt={anime.title} className="w-full h-full object-cover" />
                </div>

                {/* TITLE */}
                <h3 className="font-bold truncate mt-2">{anime.title}</h3>
                
                {/* EPISODE */}
                <p className="text-xs text-gray-500">{anime.episodes} Episodes</p>
              
              </div>
            ))}
          </div>
          <br />
          <div className="flex justify-center mt-12">
            <button className="group cursor-pointer flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-[#e14547] transition-all duration-300">
              Explore More 
              <span className="group-hover:translate-x-1 transition-transform">{'>'}</span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}