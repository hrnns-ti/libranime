'use client'

import { useState, useEffect } from "react"

export default function Page() {

    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('https://api.jikan.moe/v4/genres/anime')
                const { data } = await response.json()

                setGenres(data)
                setIsLoading(false)
            } catch (error) {
                console.error('Gagal mengambil genre: ', error)
            }
        }

        fetchGenres()
    }, [])

    if (isLoading) return <div className="p-8 animate-pulse flex gap-2"><div className="h-8 w-20 bg-gray-200 rounded-full"></div></div>

    return (
        <section className="p-8">
            <div className="flex flex-wrap gap-2">
                <p className="w-full font-bold mb-2">FILTER</p>
                {genres.map((genre) => (
                    <button 
                        // @ts-ignore
                        key={genre.mal_id} 
                        onClick={() => {
                            // @ts-ignore
                            setSelectedGenres(prev => 
                                // @ts-ignore
                                prev.includes(genre.mal_id) 
                                // @ts-ignore
                                ? prev.filter(id => id !== genre.mal_id) 
                                // @ts-ignore
                                : [...prev, genre.mal_id]
                            )
                        }} 
                        
                        className={`px-4 py-1.5 rounded-full text-sm transition-all border ${
                            // @ts-ignore
                            selectedGenres.includes(genre.mal_id) 
                            ? 'bg-gray-900 text-white border-gray-900' 
                            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                        }`}
                    >
                        {/* @ts-ignore */}
                        {genre.name}
                    </button>
                ))}
            </div>
        </section>
    )
}