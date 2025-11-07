import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaTrash} from "react-icons/fa";


function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    liked: boolean;
  };
  onToggleLike: (id: number) => void;
  onRemove: (id: number) => void;
}

function ProductCard(props: ProductCardProps) {
  const { product, onToggleLike, onRemove } = props;

  // Обработчик клика по лайку
  function handleLikeClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onToggleLike(product.id);
  }

  // Обработчик клика по корзине
  function handleRemoveClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    onRemove(product.id);
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/products/${product.id}`} className="block">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain bg-gray-100"
          />
          <div className="p-4">
            <h3 className="font-semibold truncate">{product.title}</h3>
            <p className="text-gray-600 text-sm mt-1">
              {truncateText(product.description)}
            </p>
            <p className="text-lg font-bold mt-2">${product.price}</p>
          </div>
        </Link>

        <div className="absolute top-2 right-2 flex gap-2">
          <button onClick={handleLikeClick}>
            {product.liked ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl" />
            )}
          </button>
          <button onClick={handleRemoveClick} className="text-gray-500 hover:text-red-500 text-xl">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;