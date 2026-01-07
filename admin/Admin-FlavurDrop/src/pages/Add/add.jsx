import React, { useState } from "react";
import "./add.css";
import API from "../../utils/api";

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);

    const res = await API.post("/api/food/add", formData);

    if (res.data.success) {
      alert("Product Added");
      setData({ name: "", description: "", price: "", category: "Salad" });
      setImage(false);
    } else {
      alert("Error");
    }
  };

  return (
    <div className="Add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
        <input name="name" value={data.name} onChange={onChangeHandler} placeholder="Product name" />
        <textarea name="description" value={data.description} onChange={onChangeHandler} />
        <input name="price" value={data.price} onChange={onChangeHandler} placeholder="Price" />
        <select name="category" value={data.category} onChange={onChangeHandler}>
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
};

export default Add;
