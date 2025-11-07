import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import ProductCard from "../components/ProductCard";
import { useFetchProducts } from "../hooks/useFetchState";

function ProductPage () {
    useFetchProducts();

    const products = useProductStore((state) => state.products);
    const toggleLike = useProductStore((state) => state.toggleLike);
    const removeProduct = useProductStore((state) => state.removeProduct);

    const [filter, setFilter] = useState<'all' | 'liked'>('all');
    const [search, setSearch] =useState('');

    // Фильтрация и поиск
    const filteredProducts = products
    .filter ((product) => {
        if(filter === 'liked'){
            return product.liked;
        }
        return true;
    })
    .filter ((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
    });

    // Кнопки фильтра
    function handleShowAll() {
        setFilter('all');
    }
    
    function handleShowLiked() {
        setFilter('liked');
    }

    return (
        <div className="p-6 max-w-6x1 mx-auto">
            <h1 className="text-2x1 font-bold mb-6">Товары</h1>

            {/* Фильтры */}
            <div className="mb-6 flex gap-4 flex-wrap">
                <button
                className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={handleShowAll}>Показать все</button>
                <button
                className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={handleShowLiked}>Показать понравившиеся</button>
                <input
                type="text"
                placeholder="Поиск..."
                className="px-4 py-2 border rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Карточки */}
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                <ProductCard
                key={product.id}
                product={product}
                onToggleLike={toggleLike}
                 onRemove={removeProduct}
                />
                 ))}
           </div>

            {filteredProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-8">Товары не найдены</p>
            )}   

             {/*Кнопка создать*/}
             <div className="mt-8">
                <Link 
                to='/create-product'
                className="px-4 py-2 bg-green-500 text-white rounded hover:bd-green-600">Добавть товар</Link>
             </div>
        </div>
    );
}

export default ProductPage;