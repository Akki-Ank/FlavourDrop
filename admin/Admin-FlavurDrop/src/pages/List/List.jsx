import React, { useEffect, useState } from "react";
import "./List.css";
import API from "../../utils/api";

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all food items
  const fetchList = async () => {
    try {
      const res = await API.get("/api/food/list");

      if (res.data.success) {
        setList(res.data.data);
      } else {
        setList([]);
      }
    } catch (error) {
      console.log("Error fetching list:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete food item
  const removeFood = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      const res = await API.post("/api/food/remove", { id });

      if (res.data.success) {
        alert("Product deleted");
        fetchList(); // refresh list
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.log("Error deleting item:", error);
    }
  };

  // Load list when page opens
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2>All Food Items</h2>

      {loading && <p>Loading...</p>}

      {!loading && list.length === 0 && (
        <p>No products found. Add some products first.</p>
      )}

      <div className="list-table">
        {list.map((item) => (
          <div key={item._id} className="list-table-row">
            <img
              src={`http://localhost:4000/images/${item.image}`}
              alt={item.name}
              className="list-image"
            />

            <p className="list-name">{item.name}</p>
            <p className="list-category">{item.category}</p>
            <p className="list-price">₹{item.price}</p>

            <button
              className="list-delete-btn"
              onClick={() => removeFood(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
