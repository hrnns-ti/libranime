'use client'
export const runtime = 'edge';

import { useState, useEffect, useCallback } from "react"
import FilterDropdown from "@/components/common/FilterDropdown"
import Link from "next/link";

export default function Page() {
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [animeList, setAnimeList] = useState([])

    const [isLoadingGenre, setIsLoadingGenre] = useState(true)
    const [isLoadingAnime, setIsLoadingAnime] = useState(false)

    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const [searchQuery, setSearchQuery] = useState('')    
    const [selectedType, setSelectedType] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("")

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

    const fetchAnimeByGenre = useCallback(async (isNextPage = false) => {
        setIsLoadingAnime(true)
        try {
            const genreId = genres
                .filter((g: any) => selectedGenres.includes(g.name))
                .map((g:any) => g.mal_id)
                .join(",")
            const currentPage = isNextPage ? page + 1 : 1

            const response = await fetch(
                `https://api.jikan.moe/v4/anime?limit=21&genres=${genreId}&q=${searchQuery}&type=${selectedType}&status=${selectedStatus}&order_by=popularity&page=${currentPage}`
            )
            const { data, pagination } = await response.json()
            
            if (isNextPage) {
                // @ts-ignore
                setAnimeList((prev) => [...prev, ...data])
                setPage(currentPage)
            } else {
                setAnimeList(data)
                setPage(1)
            }

            setHasMore(pagination.has_next_page)
        } catch (error) {
            console.error('gagal mengambil anime: ', error)
        } finally {
            setIsLoadingAnime(false)
        }
    }, [selectedGenres, page, searchQuery, selectedType, selectedStatus])

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetchAnimeByGenre(false)
        }, 500)
        return () => clearTimeout(delayDebounce)
    }, [selectedGenres, searchQuery, selectedType, selectedStatus])

    if (isLoadingGenre) return <div className="p-8 animate-pulse flex gap-2"><div className="h-8 w-20 bg-gray-200 rounded-full"></div></div>

    return (
        <main className="max-w-7xl mx-auto p-8">
            <section className="mb-10 space-y-6">
                <div className="flex flex-row gap-4 justify-between items items-center">
                    <Link href="./" className="font-bold text-2xl text-gray-800 tracking-tighter cursor-pointer">LIBRANIME</Link>
                    <div className="">    
                        <input 
                            type="text" 
                            placeholder="Cari judul anime..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="bg-gray-100 border border-gray-200 rounded-2xl w-full max-w-md p-4 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                        />
                        
                        <div className="flex flex-wrap gap-3 items-center pt-2">
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">Filters</p>

                            <FilterDropdown
                                label="Genre"
                                options={genres.map((g: any) => g.name)}
                                selectedValue={selectedGenres}
                                onSelect={setSelectedGenres}
                                isMulti={true}     
                            />

                            <FilterDropdown 
                                label="Type" 
                                options={['tv', 'movie', 'ova', 'special']} 
                                selectedValue={selectedType} 
                                onSelect={setSelectedType} 
                            />

                            <FilterDropdown 
                                label="Status" 
                                options={['airing', 'complete', 'upcoming']} 
                                selectedValue={selectedStatus} 
                                onSelect={setSelectedStatus} 
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-6">
                {animeList.map((anime: any) => (
                    <div key={anime.mal_id} className="group cursor-pointer">
                        <div className="relative aspect-3/4 overflow-hidden rounded-2xl mb-3 shadow-sm border border-gray-100 bg-gray-50">
                            <img 
                                src={anime.images.webp.image_url} 
                                alt={anime.title} 
                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="font-bold text-sm line-clamp-2 leading-snug text-gray-800 group-hover:text-blue-600 transition-colors">{anime.title}</h3>
                        <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">{anime.type} • {anime.episodes || '?'} Eps</p>
                    </div>
                ))}

                {isLoadingAnime && (
                    [...Array(14)].map((_, i) => (
                        <div key={`skeleton-${i}`} className="aspect-3/4 bg-gray-100 rounded-2xl animate-pulse"></div>
                    ))
                )}
            </section>

            {hasMore && !isLoadingAnime && animeList.length > 0 && (
                <div className="flex justify-center mt-12 mb-20">
                    <button
                        onClick={() => fetchAnimeByGenre(true)}
                        className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                    >
                        Load More Anime
                    </button>
                </div>
            )}
        </main>
    )
}