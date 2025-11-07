import { useParams, Link } from "react-router-dom"; 
import { useProductStore } from "../store/useProductStore";

function ProductDetailPage() {
    const {id} = useParams<{id: string}>();
    const productId = Number(id);

    const product = useProductStore((state) => state.products.find((p) => p.id === productId));

    if(!product) {
        return (
            <div className="p-6 text-center">
                <p>Товар не найден.</p>
            <Link to="/products" className="text-blue-500 mt-4 inline-block">
                ← Назад к товарам.
            </Link>
            </div>
         );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
      <Link to="/products" className="text-blue-500 hover:underline mb-4 block">
        ← Назад к товарам.
      </Link>
      <div className="border rounded-lg p-6 shadow">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-bold mt-4">${product.price}</p>
        <p className="text-sm text-gray-500">Категория: {product.category}</p>
      </div>
    </div>
    )
}

export default ProductDetailPage;
