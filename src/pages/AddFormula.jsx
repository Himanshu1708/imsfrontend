
// import "./AddFormula.css";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Layout from "../component/Layout";
// import PaginationComponent from "../component/PaginationComponent";
// import ApiService from "../service/ApiService";
// export function AddFormula() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [ingredients, setIngredients] = useState([{ name: "", quantity: 0, unit: "" }]);
//   const [manufacturingSteps, setManufacturingSteps] = useState([""]);
//   const [formulas, setFormulas] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);
//   const [message, setMessage] = useState("");




  
//   useEffect(() => {
//     fetchFormulas();
//   }, []);

//   const fetchFormulas = async () => {
//     try {
//       const data = await ApiService.getAllFormulas();
//       setFormulas(data);
//     } catch (err) {
//       showMessage("Error fetching formulas");
//       console.error(err);
//     }
//   };

//   const resetForm = () => {
//     setName("");
//     setDescription("");
//     setIngredients([{ name: "", quantity: 0, unit: "" }]);
//     setManufacturingSteps([""]);
//     setEditingId(null);
//     setSuccess(false);
//     setError(null);
//     setMessage("");
//   };

//   const handleIngredientChange = (index, field, value) => {
//     const updated = [...ingredients];
//     updated[index][field] = field === "quantity" ? Number(value) : value;
//     setIngredients(updated);
//   };

//   const handleAddIngredient = () => {
//     setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
//   };

//   const handleRemoveIngredient = (index) => {
//     const updated = ingredients.filter((_, i) => i !== index);
//     setIngredients(updated.length ? updated : [{ name: "", quantity: 0, unit: "" }]);
//   };

//   const handleStepChange = (index, value) => {
//     const updated = [...manufacturingSteps];
//     updated[index] = value;
//     setManufacturingSteps(updated);
//   };

//   const handleAddStep = () => setManufacturingSteps([...manufacturingSteps, ""]);

//   const handleRemoveStep = (index) => {
//     const updated = manufacturingSteps.filter((_, i) => i !== index);
//     setManufacturingSteps(updated.length ? updated : [""]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(false);
//     setMessage("");

//     const payload = { name, description, ingredients, manufacturingSteps };

//     try {
//       if (editingId) {
//         await ApiService.updateFormula(editingId, payload);
//         showMessage("Formula successfully updated");
//       } else {
//         await ApiService.saveFormula(payload);
//         showMessage("Formula successfully added");
//       }
//       resetForm();
//       fetchFormulas();
//       setSuccess(true);
//     } catch (err) {
//       const msg = err.response?.data?.message || "Error saving formula";
//       setError(msg);
//       showMessage(msg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (formula) => {
//     setName(formula.name);
//     setDescription(formula.description);
//     setIngredients(formula.ingredients.length ? formula.ingredients : [{ name: "", quantity: 0, unit: "" }]);
//     setManufacturingSteps(formula.manufacturingSteps.length ? formula.manufacturingSteps : [""]);
//     setEditingId(formula.id);
//     setError(null);
//     setSuccess(false);
//     setMessage("");
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this formula?")) return;
//     try {
//       await ApiService.deleteFormula(id);
//       showMessage("Formula deleted successfully");
//       fetchFormulas();
//     } catch (err) {
//       showMessage("Error deleting formula");
//       console.error(err);
//     }
//   };

//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => {
//       setMessage("");
//     }, 4000);
//   };

//   const thStyle = {
//     padding: "8px",
//     border: "1px solid #e5e7eb",
//     backgroundColor: "#f3f4f6",
//   };

//   const tdStyle = {
//     padding: "8px",
//     border: "1px solid #e5e7eb",
//     color: "#008080",
//     fontWeight: "bold",
//   };

//   return (
//     <Layout>
//       <div style={{ padding: "24px" }}>
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             maxWidth: "768px",
//             margin: "0 auto",
//             backgroundColor: "#fff",
//             borderRadius: "10px",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//             padding: "24px",
//             display: "flex",
//             flexDirection: "column",
//             gap: "16px",
//           }}
//         >
//           <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#008080" }}>
//             {editingId ? "Update Formula" : "Create New Formula"}
//           </h2>

//           <input
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Formula Name"
//             style={{ width: "100%", border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}
//             required
//           />

//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Description"
//             style={{ width: "100%", border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}
//             required
//           />

//           {/* Ingredients */}
//           <div>
//             <label style={{ fontWeight: "500", color: "#008080" }}>Ingredients</label>
//             {ingredients.map((ing, i) => (
//               <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", margin: "8px 0" }}>
//                 <input
//                   placeholder="Name"
//                   value={ing.name}
//                   onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
//                   style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
//                   required
//                 />
//                 <input
//                   type="number"
//                   placeholder="Qty"
//                   value={ing.quantity}
//                   onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)}
//                   style={{ width: "80px", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
//                   required
//                 />
//                 <input
//                   placeholder="Unit"
//                   value={ing.unit}
//                   onChange={(e) => handleIngredientChange(i, "unit", e.target.value)}
//                   style={{ width: "80px", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveIngredient(i)}
//                   style={{ color: "#dc2626", fontWeight: "bold", border: "none", background: "none", cursor: "pointer" }}
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddIngredient}
//               style={{ color: "#008080", fontSize: "0.9rem", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
//             >
//               + Add Ingredient
//             </button>
//           </div>

//           {/* Manufacturing Steps */}
//           <div>
//             <label style={{ fontWeight: "500", color: "#008080" }}>Manufacturing Steps</label>
//             {manufacturingSteps.map((step, i) => (
//               <div key={i} style={{ display: "flex", gap: "8px", alignItems: "center", margin: "8px 0" }}>
//                 <input
//                   value={step}
//                   onChange={(e) => handleStepChange(i, e.target.value)}
//                   placeholder={`Step ${i + 1}`}
//                   style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => handleRemoveStep(i)}
//                   style={{ color: "#dc2626", fontWeight: "bold", border: "none", background: "none", cursor: "pointer" }}
//                 >
//                   &times;
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={handleAddStep}
//               style={{ color: "#008080", fontSize: "0.9rem", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
//             >
//               + Add Step
//             </button>
//           </div>

//           {/* Submit / Cancel */}
//           <div style={{ display: "flex", gap: "16px" }}>
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 padding: "10px 20px",
//                 borderRadius: "6px",
//                 backgroundColor: loading ? "#9ca3af" : "#008080",
//                 color: "#fff",
//                 border: "none",
//                 cursor: "pointer",
//               }}
//             >
//               {editingId ? "Update" : "Submit"}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 style={{
//                   padding: "10px 20px",
//                   borderRadius: "6px",
//                   backgroundColor: "#9ca3af",
//                   color: "#fff",
//                   border: "none",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//             )}
//           </div>

//           {success && <p style={{ color: "#16a34a" }}>Success!</p>}
//           {error && <p style={{ color: "#dc2626" }}>{error}</p>}
//           {message && <p style={{ color: "#16a34a" }}>{message}</p>}
//         </form>

//         {/* Formulas Table */}
//         <div
//           style={{
//             maxWidth: "1200px",
//             margin: "40px auto 0",
//             backgroundColor: "#fff",
//             padding: "24px",
//             borderRadius: "10px",
//             boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//           }}
//         >
//           <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", color: "#008080" }}>
//             Formulas List
//           </h3>
//           <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#e0f7f7" }}>
//                 <th style={thStyle}>ID</th>
//                 <th style={thStyle}>Name</th>
//                 <th style={thStyle}>Ingredients</th>
//                 <th style={thStyle}>Manufacturing Steps</th>
//                 <th style={thStyle}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formulas.map((formula) => (
//                 <tr key={formula.id} style={{ verticalAlign: "top", transition: "background 0.2s" }}>
//                   <td style={tdStyle}>{formula.id}</td>
//                   <td style={tdStyle}>{formula.name}</td>
//                   <td style={tdStyle}>
//                     <ul style={{ maxHeight: "160px", overflowY: "auto", fontSize: "12px", paddingLeft: "20px" }}>
//                       {formula.ingredients.map((ing, i) => (
//                         <li key={i}>
//                           {ing.name} — {ing.quantity} {ing.unit}
//                         </li>
//                       ))}
//                     </ul>
//                   </td>
//                   <td style={tdStyle}>
//                     <ol style={{ maxHeight: "160px", overflowY: "auto", fontSize: "12px", paddingLeft: "20px" }}>
//                       {formula.manufacturingSteps.map((step, i) => (
//                         <li key={i}>{step}</li>
//                       ))}
//                     </ol>
//                   </td>
//                   <td style={tdStyle}>
//                     <button
//                       onClick={() => handleEdit(formula)}
//                       style={{ color: "#008080", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", marginRight: "8px" }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(formula.id)}
//                       style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {formulas.length === 0 && (
//                 <tr>
//                   <td colSpan={5} style={{ textAlign: "center", padding: "16px", color: "#6b7280" }}>
//                     No formulas found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
     
//     </Layout>
//   );
// }

// export default AddFormula;


import "./AddFormula.css";
import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import PaginationComponent from "../component/PaginationComponent";
import ApiService from "../service/ApiService";

export function AddFormula() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", quantity: 0, unit: "" }]);
  const [manufacturingSteps, setManufacturingSteps] = useState([""]);
  const [formulas, setFormulas] = useState([]);
  const [paginatedFormulas, setPaginatedFormulas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchFormulas();
  }, []);

  useEffect(() => {
    const updatePagination = () => {
      setPaginatedFormulas(
        formulas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      );
    };
    updatePagination();
  }, [currentPage, formulas]);

  const fetchFormulas = async () => {
    try {
      const data = await ApiService.getAllFormulas();
      setFormulas(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      setPaginatedFormulas(
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      );
    } catch (err) {
      showMessage("Error fetching formulas");
      console.error(err);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setIngredients([{ name: "", quantity: 0, unit: "" }]);
    setManufacturingSteps([""]);
    setEditingId(null);
    setSuccess(false);
    setError(null);
    setMessage("");
  };

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = field === "quantity" ? Number(value) : value;
    setIngredients(updated);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 0, unit: "" }]);
  };

  const handleRemoveIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated.length ? updated : [{ name: "", quantity: 0, unit: "" }]);
  };

  const handleStepChange = (index, value) => {
    const updated = [...manufacturingSteps];
    updated[index] = value;
    setManufacturingSteps(updated);
  };

  const handleAddStep = () => setManufacturingSteps([...manufacturingSteps, ""]);

  const handleRemoveStep = (index) => {
    const updated = manufacturingSteps.filter((_, i) => i !== index);
    setManufacturingSteps(updated.length ? updated : [""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage("");

    const payload = { name, description, ingredients, manufacturingSteps };

    try {
      if (editingId) {
        await ApiService.updateFormula(editingId, payload);
        showMessage("Formula successfully updated");
      } else {
        await ApiService.saveFormula(payload);
        showMessage("Formula successfully added");
      }
      resetForm();
      fetchFormulas();
      setSuccess(true);
    } catch (err) {
      const msg = err.response?.data?.message || "Error saving formula";
      setError(msg);
      showMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (formula) => {
    setName(formula.name);
    setDescription(formula.description);
    setIngredients(formula.ingredients.length ? formula.ingredients : [{ name: "", quantity: 0, unit: "" }]);
    setManufacturingSteps(formula.manufacturingSteps.length ? formula.manufacturingSteps : [""]);
    setEditingId(formula.id);
    setError(null);
    setSuccess(false);
    setMessage("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this formula?")) return;
    try {
      await ApiService.deleteFormula(id);
      showMessage("Formula deleted successfully");
      fetchFormulas();
    } catch (err) {
      showMessage("Error deleting formula");
      console.error(err);
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const thStyle = {
    padding: "8px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f3f4f6",
  };

  const tdStyle = {
    padding: "8px",
    border: "1px solid #e5e7eb",
    color: "#008080",
    fontWeight: "bold",
  };

  return (
    <Layout>
      <div style={{ padding: "24px" }}>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "768px",
            margin: "0 auto",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#008080" }}>
            {editingId ? "Update Formula" : "Create New Formula"}
          </h2>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Formula Name"
            required
            style={{ width: "100%", border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            style={{ width: "100%", border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}
          />

          {/* Ingredients */}
          <div>
            <label style={{ fontWeight: "500", color: "#008080" }}>Ingredients</label>
            {ingredients.map((ing, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  placeholder="Name"
                  value={ing.name}
                  onChange={(e) => handleIngredientChange(i, "name", e.target.value)}
                  required
                  style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={ing.quantity}
                  onChange={(e) => handleIngredientChange(i, "quantity", e.target.value)}
                  required
                  style={{ width: "80px", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
                <input
                  placeholder="Unit"
                  value={ing.unit}
                  onChange={(e) => handleIngredientChange(i, "unit", e.target.value)}
                  required
                  style={{ width: "80px", padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
                <button type="button" onClick={() => handleRemoveIngredient(i)} style={{ color: "#dc2626", border: "none", background: "none" }}>
                  &times;
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient} style={{ color: "#008080", border: "none", background: "none" }}>
              + Add Ingredient
            </button>
          </div>

          {/* Manufacturing Steps */}
          <div>
            <label style={{ fontWeight: "500", color: "#008080" }}>Manufacturing Steps</label>
            {manufacturingSteps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                <input
                  value={step}
                  onChange={(e) => handleStepChange(i, e.target.value)}
                  placeholder={`Step ${i + 1}`}
                  required
                  style={{ flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "6px" }}
                />
                <button type="button" onClick={() => handleRemoveStep(i)} style={{ color: "#dc2626", border: "none", background: "none" }}>
                  &times;
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddStep} style={{ color: "#008080", border: "none", background: "none" }}>
              + Add Step
            </button>
          </div>

          {/* Submit / Cancel */}
          <div style={{ display: "flex", gap: "16px" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: "10px 20px",
                borderRadius: "6px",
                backgroundColor: loading ? "#9ca3af" : "#008080",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              {editingId ? "Update" : "Submit"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{ padding: "10px 20px", borderRadius: "6px", backgroundColor: "#9ca3af", color: "#fff", border: "none" }}
              >
                Cancel
              </button>
            )}
          </div>

          {success && <p style={{ color: "#16a34a" }}>Success!</p>}
          {error && <p style={{ color: "#dc2626" }}>{error}</p>}
          {message && <p style={{ color: "#16a34a" }}>{message}</p>}
        </form>

        {/* Formulas Table */}
        <div style={{ marginTop: "40px", backgroundColor: "#fff", padding: "24px", borderRadius: "10px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px", color: "#008080" }}>Formulas List</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr>
                <th style={thStyle}>ID</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Ingredients</th>
                <th style={thStyle}>Steps</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedFormulas.map((formula) => (
                <tr key={formula.id}>
                  <td style={tdStyle}>{formula.id}</td>
                  <td style={tdStyle}>{formula.name}</td>
                  <td style={tdStyle}>
                    <ul style={{ paddingLeft: "20px" }}>
                      {formula.ingredients.map((ing, idx) => (
                        <li key={idx}>{ing.name} — {ing.quantity} {ing.unit}</li>
                      ))}
                    </ul>
                  </td>
                  <td style={tdStyle}>
                    <ol style={{ paddingLeft: "20px" }}>
                      {formula.manufacturingSteps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => handleEdit(formula)} style={{ color: "#008080", background: "none", border: "none" }}>Edit</button>
                    <button onClick={() => handleDelete(formula.id)} style={{ color: "#dc2626", background: "none", border: "none", marginLeft: "10px" }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationComponent
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </Layout>
  );
}

export default AddFormula;



