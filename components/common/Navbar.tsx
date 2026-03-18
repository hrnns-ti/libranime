export default function Navbar() {
    return (
        <>
            <nav className="flex top-0 w-full z-50 justify-between px-14 py-8 items-center">
                <p className="text-2xl font-extrabold">LIBRANIME</p>
                <div className="flex gap-12">
                    <a className="cursor-pointer hover:text-[#5DA8FB] transition-colors duration-350">Anime</a>
                    <a className="cursor-pointer hover:text-[#5DA8FB] transition-colors duration-350">Manga</a>
                    <a className="cursor-pointer hover:text-[#5DA8FB] transition-colors duration-350">Random Anime</a>
                    <a className="cursor-pointer hover:text-[#5DA8FB] transition-colors duration-350">Top Anime</a>
                    <a className="cursor-pointer hover:text-[#5DA8FB] transition-colors duration-350">Feedback</a>
                </div>
                <div className="flex gap-6">
                    <input placeholder="Search an anime" type="search" className="bg-gray-200 rounded-full w-72 p-4" />
                    <button className="bg-[#5DA8FB] rounded-full w-72 p-4 text-white cursor-pointer hover:bg-[#4594ed] transition-colors duration-350">Registration</button>
                </div>
            </nav>
        </>
    );
}