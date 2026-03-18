export default function Loading() {
  return (
    <>
      {/* SKELETON SECTION 1 (HEADLINE) */}
      <section className="relative w-full h-1/2 flex">
        <div className="px-4 w-full"> 
          {/* Skeleton Title: Kita buat 2 baris kotak abu-abu besar */}
          <div className="mx-8 my-4 space-y-4">
            <div className="h-20 bg-gray-200 animate-pulse w-3/4 rounded-lg"></div>
            <div className="flex items-center gap-4">
              <div className="h-20 bg-gray-200 animate-pulse w-1/2 rounded-lg"></div>
              {/* Bulatan untuk foto karakter di headline */}
              <div className="w-40 h-20 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKELETON SECTION 2 (TRENDING) */}
      <section className="relative w-full h-auto flex justify-center">
        <div className="m-12 w-full max-w-[1400px]"> {/* Sesuaikan lebar jika perlu */}
          
          {/* Skeleton Title "Trending" */}
          <div className="h-8 bg-gray-200 animate-pulse w-32 rounded-md my-4 ml-2"></div>

          {/* Grid: Harus grid-cols-7 & gap-6 sama dengan aslinya */}
          <div className="grid grid-cols-7 gap-6">
            {[...Array(7)].map((_, index) => (
              <div key={index} className="w-full">
                
                {/* PICTURE SKELETON */}
                <div className="rounded-lg bg-gray-200 animate-pulse aspect-[3/4]"></div>

                {/* TITLE SKELETON */}
                <div className="h-4 bg-gray-200 animate-pulse rounded mt-3 w-full"></div>
                
                {/* EPISODE SKELETON */}
                <div className="h-3 bg-gray-200 animate-pulse rounded mt-2 w-1/2"></div>
              
              </div>
            ))}
          </div>

          {/* SKELETON BUTTON EXPLORE MORE */}
          <div className="flex justify-center mt-24">
            <div className="w-40 h-12 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </section>
    </>
  );
}