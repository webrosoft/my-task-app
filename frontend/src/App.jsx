import { useState, useEffect } from "react";
import { getItems, addItem, updateItem, deleteItem } from "../api.js";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleAdd = async () => {
    if (!name.trim()) return;
    await addItem({ name, description });
    setName("");
    setDescription("");
    loadItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
  };

  const handleUpdate = async () => {
    await updateItem(editingItem.id, { name, description });
    setEditingItem(null);
    setName("");
    setDescription("");
    loadItems();
  };

  const handleDelete = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Item Manager
      </h1>

      {/* ✅ Updated form with Enter key support */}
      <form
        className="flex flex-col md:flex-row gap-2 mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          editingItem ? handleUpdate() : handleAdd();
        }}
      >
        <input
          className="border p-2 rounded w-full md:w-1/3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full md:w-1/3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            editingItem ? "bg-yellow-500" : "bg-blue-500"
          }`}
        >
          {editingItem ? "Update" : "Add"}
        </button>
      </form>

      {/* ✅ Items list */}
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded shadow hover:shadow-lg"
          >
            <span>
              <strong>{item.name}</strong> - {item.description}
            </span>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-3 py-1 rounded text-black"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
