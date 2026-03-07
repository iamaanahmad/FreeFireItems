"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { RawItemData, ProcessedItem } from "@/types";
import { Search, Info, X, ChevronLeft, ChevronRight, Share2, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ITEMS_PER_PAGE = 48;
const API_ENDPOINT = "https://raw.githubusercontent.com/starexxx/FFItems/74c2af66d691776c2452bd72ca0388ba52d7c5fb/assets/itemData.json";
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "https://raw.githubusercontent.com/starexxx/FFItems/main/assets/icons";

export default function ItemExplorer() {
    const [data, setData] = useState<ProcessedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [search, setSearch] = useState("");
    const [rarity, setRarity] = useState("");
    const [itemType, setItemType] = useState("");
    const [collection, setCollection] = useState("");
    const [page, setPage] = useState(0);

    const [selectedItem, setSelectedItem] = useState<ProcessedItem | null>(null);

    // Stats for dropdowns
    const [filters, setFilters] = useState({
        rarities: new Set<string>(),
        types: new Set<string>(),
        collections: new Set<string>(),
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(API_ENDPOINT);
                if (!res.ok) throw new Error("Failed to fetch data");
                const raw: RawItemData[] = await res.json();

                const rarities = new Set<string>();
                const types = new Set<string>();
                const collections = new Set<string>();

                const processed = raw.map(item => {
                    const type = item.itemType ? item.itemType.replace(/_/g, " ") : "Unknown";
                    const col = item.collectionType ? item.collectionType.replace(/_/g, " ") : "Unknown";
                    const r = item.Rare || "Common";

                    if (type !== "Unknown") types.add(type);
                    if (col !== "Unknown") collections.add(col);
                    if (r) rarities.add(r);

                    return {
                        itemId: String(item.itemID || "Unknown"),
                        name: String(item.description || "Unknown Item"),
                        iconName: String(item.icon || "unknown"),
                        description: String(item.description || "No description available"),
                        description2: String(item.description2 || ""),
                        itemType: String(type),
                        collectionType: String(col),
                        Rare: String(r),
                        imageUrl: `${IMAGE_BASE_URL}/${item.itemID}.png`
                    };
                }).filter(i => i.itemId !== "Unknown");

                setFilters({ rarities, types, collections });
                setData(processed);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const searchTerms = search.toLowerCase().split(" ").filter(t => t);
            const matchesSearch = searchTerms.length === 0 || searchTerms.every(term =>
                item.name.toLowerCase().includes(term) ||
                item.itemId.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term) ||
                item.description2.toLowerCase().includes(term) ||
                item.itemType.toLowerCase().includes(term) ||
                item.collectionType.toLowerCase().includes(term) ||
                item.Rare.toLowerCase().includes(term)
            );

            const matchesRarity = !rarity || item.Rare === rarity;
            const matchesType = !itemType || item.itemType === itemType;
            const matchesCol = !collection || item.collectionType === collection;

            return matchesSearch && matchesRarity && matchesType && matchesCol;
        });
    }, [data, search, rarity, itemType, collection]);

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const visibleItems = filteredData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    useEffect(() => {
        setPage(0);
    }, [search, rarity, itemType, collection]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-orange"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 bg-card-bg/50 rounded-xl border border-red-500/30 text-red-400">
                <h2 className="text-xl font-bold mb-2">Error Loading Items</h2>
                <p>{error}</p>
                <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-primary-orange text-white rounded-lg hover:bg-orange-600 transition">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 space-y-8">
            {/* Search & Filters */}
            <section className="bg-card-bg glass-panel border-card-border rounded-xl p-6 md:p-8 shadow-medium">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-orange to-[#ff8a65] mb-6 flex items-center gap-2">
                    <Search className="text-primary-orange" /> Search & Filter Items
                </h3>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search by name, ID, description, rarity..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full py-4 pl-12 pr-12 rounded-lg bg-black/40 border border-primary-orange/30 text-white focus:outline-none focus:border-primary-orange focus:ring-2 focus:ring-primary-orange/20 transition-all font-sans text-base backdrop-blur-md"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-orange/80 h-5 w-5" />
                    {search && (
                        <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition">
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FilterSelect label="Rarity" value={rarity} onChange={setRarity} options={Array.from(filters.rarities).sort()} />
                    <FilterSelect label="Item Type" value={itemType} onChange={setItemType} options={Array.from(filters.types).sort()} />
                    <FilterSelect label="Collection" value={collection} onChange={setCollection} options={Array.from(filters.collections).sort()} />
                </div>

                <div className="mt-6 text-center text-sm text-text-secondary">
                    Showing <span className="text-primary-orange font-semibold">{filteredData.length}</span> items
                </div>
            </section>

            {/* Grid */}
            {filteredData.length === 0 ? (
                <div className="text-center py-20 bg-card-bg/20 rounded-xl border border-card-border border-dashed">
                    <Info className="h-12 w-12 text-primary-orange/50 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-text-primary">No items found</h3>
                    <p className="text-text-secondary mt-2">Try adjusting your search or filters</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    <AnimatePresence mode="popLayout">
                        {visibleItems.map((item, i) => (
                            <motion.div
                                key={item.itemId}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: i * 0.02 }}
                                onClick={() => setSelectedItem(item)}
                                className="group relative h-36 bg-gradient-to-br from-card-bg to-black/80 rounded-xl border border-card-border overflow-hidden cursor-pointer backdrop-blur-md hover:border-primary-orange hover:shadow-orange transition-all flex flex-col items-center justify-center p-4 hover:-translate-y-2"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                <ItemImage src={item.imageUrl} alt={item.name} fallbackId={item.itemId} />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-1 text-center text-xs text-text-secondary truncate px-2 border-t border-card-border group-hover:text-primary-orange transition-colors">
                                    {item.name}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2 overflow-x-auto p-4 bg-card-bg/50 glass-panel rounded-full shadow-medium max-w-fit mx-auto">
                    <button
                        disabled={page === 0}
                        onClick={() => handlePageChange(page - 1)}
                        className="p-2 rounded-lg hover:bg-primary-orange/20 disabled:opacity-50 text-white"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }).map((_, i) => {
                            // Simple pagination logic, showing a few around current
                            if (i === 0 || i === totalPages - 1 || Math.abs(page - i) <= 2) {
                                return (
                                    <button
                                        key={i}
                                        onClick={() => handlePageChange(i)}
                                        className={`w-10 h-10 rounded-lg font-medium transition-all ${page === i ? 'bg-primary-orange text-white shadow-orange' : 'hover:bg-primary-orange/20 text-text-secondary hover:text-white'}`}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            }
                            if (Math.abs(page - i) === 3) {
                                return <span key={i} className="px-2 text-text-muted">...</span>;
                            }
                            return null;
                        })}
                    </div>

                    <button
                        disabled={page === totalPages - 1}
                        onClick={() => handlePageChange(page + 1)}
                        className="p-2 rounded-lg hover:bg-primary-orange/20 disabled:opacity-50 text-white"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

// Components
function FilterSelect({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: string[] }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-white/70 mb-2">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none p-3 pr-10 rounded-lg border border-primary-orange/20 bg-background-secondary text-white capitalize focus:outline-none focus:border-primary-orange focus:ring-1 focus:ring-primary-orange transition-colors shadow-sm cursor-pointer"
                >
                    <option value="">All {label}s</option>
                    {options.map(o => (
                        <option key={o} value={o}>{o}</option>
                    ))}
                </select>
                <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-orange pointer-events-none" />
            </div>
        </div>
    );
}

function ItemImage({ src, alt, fallbackId }: { src: string, alt: string, fallbackId: string }) {
    const [error, setError] = useState(false);

    // fallback logic like index.html
    const currentSrc = error ? `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjMkEyQTJBIiByeD0iOCIvPgo8cGF0aCBkPSJNMjUgMTVWMzVNMTUgMjVIMzUiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9zdmc+` : src;

    return (
        <img
            src={currentSrc}
            alt={alt}
            onError={() => !error && setError(true)}
            loading="lazy"
            className="w-20 h-20 object-contain drop-shadow-lg transform transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6 z-10"
        />
    );
}

function ItemModal({ item, onClose }: { item: ProcessedItem, onClose: () => void }) {
    const [toast, setToast] = useState<string | null>(null);

    const handleShare = async () => {
        // Enforce the production domain for SEO and sharing previews
        const url = `https://arsenal.freefirecommunity.com/?item=${item.itemId}`;
        if (navigator.share && navigator.canShare && navigator.canShare({ url })) {
            try {
                await navigator.share({
                    title: `${item.name} - Arsenal`,
                    text: `Check out this Free Fire item: ${item.description}! 🔥`,
                    url
                });
            } catch (err) {
                console.error("Error sharing", err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setToast("Link copied to clipboard! 📋");
            } catch (err) {
                setToast("Failed to copy link");
            }
            setTimeout(() => setToast(null), 3000);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#111111] border border-primary-orange/30 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
            >
                <AnimatePresence>
                    {toast && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-primary-orange text-white px-4 py-2 rounded-lg font-semibold shadow-glow text-sm"
                        >
                            {toast}
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute top-4 right-4 flex gap-2">
                    <button onClick={handleShare} className="p-2 rounded-full bg-background-secondary/80 text-white hover:bg-primary-orange transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button onClick={onClose} className="p-2 rounded-full bg-background-secondary/80 text-white hover:bg-red-500 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex justify-center mb-8 relative">
                        <div className="absolute inset-0 bg-primary-orange/10 blur-3xl rounded-full w-32 h-32 mx-auto" />
                        <ItemImage src={item.imageUrl} alt={item.name} fallbackId={item.itemId} />
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-orange to-[#ff8a65] mb-2">{item.description}</h2>
                        {item.description2 && <p className="text-text-secondary text-sm italic">"{item.description2}"</p>}
                    </div>

                    <div className="space-y-4">
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                            <h4 className="text-xs font-bold text-primary-orange uppercase tracking-wider mb-3">Item Details</h4>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <span className="text-text-secondary">Item ID</span>
                                <span className="font-mono text-white select-all">{item.itemId}</span>
                                <span className="text-text-secondary">Icon Name</span>
                                <span className="font-mono text-white break-words">{item.iconName}</span>
                            </div>
                        </div>

                        <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                            <h4 className="text-xs font-bold text-primary-orange uppercase tracking-wider mb-3">Classification</h4>
                            <div className="grid grid-cols-2 gap-y-2 text-sm">
                                <span className="text-text-secondary">Type</span>
                                <span className="text-white capitalize">{item.itemType}</span>
                                <span className="text-text-secondary">Collection</span>
                                <span className="text-white capitalize">{item.collectionType}</span>
                                <span className="text-text-secondary">Rarity</span>
                                <span className="text-white capitalize">{item.Rare}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
