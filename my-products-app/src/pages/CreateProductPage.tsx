import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

function CreateProductPage() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    
    const addProduct = useProductStore((state) => state.addProduct);
    const navigate = useNavigate();
    
    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (!title || !price || !description || !category || !image) {
            alert('Все поля обязательны для заполнения!');
            return;
        }

        const numericPrice = parseFloat(price);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            alert('Цена не может быть меньше нуля!');
            return;
        }

        addProduct({
            title: title,
            price: numericPrice,
            description: description,
            category: category,
            image: image,
            liked: false,
        });

        navigate('/products');
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
      <Link to="/products" className="text-blue-500 hover:underline mb-4 block">
        ← Назад к товарам.
      </Link>

      <h1 className="text-2xl font-bold mb-6">Добавить новый товар</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Название *</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Цена *</label>
          <input
            type="number"
            step="0.01"
            className="w-full p-2 border rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Описание *</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Категория *</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1">Фото товара *</label>
          <input
            type="url"
            className="w-full p-2 border rounded"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Добавить товар
        </button>
      </form>
    </div>
    );
}

export default CreateProductPage;