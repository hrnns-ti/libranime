import { useState } from "react";

interface FilterProps {
    label: string;
    options: string[];
    selectedValue: string | string[]; // Bisa string tunggal atau array string
    onSelect: (val: any) => void;
    isMulti?: boolean; // Tambahkan penanda multi-select
}

export default function FilterDropdown({ label, options, selectedValue, onSelect, isMulti }: FilterProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (opt: string) => {
        if (isMulti && Array.isArray(selectedValue)) {
            // Logika Tambah/Hapus dari Array
            const newValue = selectedValue.includes(opt)
                ? selectedValue.filter(v => v !== opt) // Hapus jika sudah ada
                : [...selectedValue, opt];            // Tambah jika belum ada
            onSelect(newValue);
        } else {
            // Logika Single Select biasa
            onSelect(selectedValue === opt ? "" : opt);
            setIsOpen(false); // Langsung tutup
        }
    };

    return (
        <div className="relative inline-block">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`px-4 py-2 rounded-full border text-sm flex items-center gap-2 transition-all ${
                    (isMulti ? selectedValue.length > 0 : selectedValue) 
                    ? 'bg-black text-white border-black' 
                    : 'bg-gray-50 text-gray-600 border-gray-200'
                }`}
            >
                <span className="uppercase font-bold">{label}</span>
                {isMulti && Array.isArray(selectedValue) && selectedValue.length > 0 && (
                    <span className="bg-white text-black px-1.5 rounded-full text-[10px] font-black">
                        {selectedValue.length}
                    </span>
                )}
                <span className={`text-[10px] transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 w-64 max-h-72 overflow-y-auto flex flex-wrap gap-1.5">
                        {options.map((opt) => {
                            const isSelected = isMulti && Array.isArray(selectedValue) 
                                ? selectedValue.includes(opt) 
                                : selectedValue === opt;

                            return (
                                <button
                                    key={opt}
                                    onClick={() => handleSelect(opt)}
                                    className={`px-3 py-1.5 rounded-full text-[11px] uppercase transition-all ${
                                        isSelected ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'
                                    }`}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}