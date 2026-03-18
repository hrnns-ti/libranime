import Image from "next/image";

export default async function Home() {

  // MAIN FETCH
  // const data = await fetch('https://api.jikan.moe/v4/anime')
  // const post = await data.json()
  
  // TOP ANIME
  const dataTopAnime = await fetch('https://api.jikan.moe/v4/top/anime')
  const postTopAnime = await dataTopAnime.json()
  const featuredAnime = postTopAnime.data[0]

  // TOP CHARACTER
  const dataTopChar = await fetch('https://api.jikan.moe/v4/top/characters')
  const { data: allChar } = await dataTopChar.json()

  // RANDOM TOP CHARACTER
  const randomCharIndex = Math.floor(Math.random() * allChar.length);
  const finalChar = allChar[randomCharIndex];

  return (
    <>
      {/* SECTION 1 */}
      <section className="  relative w-full h-1/2 flex">

        {/* HEADLINE */}
        <div className="select-none p-4"> 
           <h1 className="text-[#000000] m-8 gap-4 text-8xl font-light">
            <span className="text-[#e14547]">Libranime</span>
            <span className="inline-block align-middle mx-8 w-40 h-18 overflow-hidden rounded-full">
              <img 
                src={finalChar.images.jpg.image_url} 
                alt={finalChar.name} 
                className="w-full h-full object-cover object-center"
              />
            </span>
            Your Open Digital Anime Library
          </h1>
        </div>
        
        {/* TRENDING ANIME */}
        <div>

        </div>
      
      </section>
    </>
  );
}