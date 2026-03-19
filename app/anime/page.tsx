'use client'

import { useState, useEffect } from "react"

export default function Page() {
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [animeList, setAnimeList] = useState([]) // Gunakan interface

    const [isLoadingGenre, setIsLoadingGenre] = useState(true)
    const [isLoadingAnime, setIsLoadingAnime] = useState(false)

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('https://api.jikan.moe/v4/genres/anime')
                const { data } = await response.json()
                setGenres(data)
                setIsLoadingGenre(false)
            } catch (error) {
                console.error('Gagal mengambil genre: ', error)
            }
        }
        fetchGenres()
    }, [])

    useEffect(() => {
        const fetchAnimeByGenre = async () => {
            setIsLoadingAnime(true)
            try {
                const genreParams = selectedGenres.join(',')
                const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreParams}&order_by=popularity`)
                const { data } = await response.json()
                setAnimeList(data)
            } catch (error) {
                console.error('gagal mengambil anime: ', error)
            } finally {
                setIsLoadingAnime(false)
            }
        }
        fetchAnimeByGenre()
    }, [selectedGenres])

    if (isLoadingGenre) return <div className="p-8 animate-pulse flex gap-2"><div className="h-8 w-20 bg-gray-200 rounded-full"></div></div>

    return (
        <main className="max-w-350 mx-auto p-8">
            <section className="mb-10">
                <div className="flex flex-wrap gap-2">
                    <p className="w-full font-bold mb-2 text-gray-800">FILTER</p>
                    {genres.map((genre: any) => (
                        <button 
                            key={genre.mal_id} 
                            onClick={() => {
                                setSelectedGenres((prev: any) => 
                                    prev.includes(genre.mal_id) 
                                    ? prev.filter((id: number) => id !== genre.mal_id) 
                                    : [...prev, genre.mal_id]
                                )
                            }} 
                            className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                                selectedGenres.includes(genre.mal_id as never) 
                                ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                            }`}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {isLoadingAnime ? (
                    [...Array(10)].map((_, i) => (
                        <div key={i} className="aspect-3/4 bg-gray-100 rounded-2xl animate-pulse"></div>
                    ))
                ) : (
                    animeList.map((anime) => (
                        // @ts-ignore
                        <div key={anime.mal_id} className="group cursor-pointer">
                            <div className="relative aspect-3/4 overflow-hidden rounded-2xl mb-3 shadow-sm border border-gray-50 border-opacity-50">
                                <img 
                                    // @ts-ignore
                                    src={anime.images.webp.image_url} 
                                    // @ts-ignore
                                    alt={anime.title} 
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                                    />
                            </div>
                            {/* @ts-ignore */}
                            <h3 className="font-bold text-sm line-clamp-2 leading-snug text-gray-800">{anime.title}</h3>
                            {/* @ts-ignore */}
                            <p className="text-xs text-gray-400 mt-1">{anime.type} • {anime.episodes} Eps</p>
                        </div>
                    ))
                )}
            </section>
        </main>
    )
}