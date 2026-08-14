import { useState, useEffect } from "react";
import { supabase } from "./supabase";

function Categories(props) {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      console.log("categories data:", data);
      console.log("categories error:", error);
      setCategories(data || []);
    };
    getCategories();
  }, []);
  return (
    <select className="input" onChange={(e) => props.onChange(e.target.value)}>
      <option value="">--Choisir une categorie</option>
      {Categories.map((Categorie) => (
        <option key={Categorie.id} value={Categorie.id}>
          {Categorie.nom}
        </option>
      ))}
    </select>
  );
}
export default Categories;
