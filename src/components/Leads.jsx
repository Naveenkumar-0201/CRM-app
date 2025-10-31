import React, { useState, useEffect } from "react";

function Leads() {
  const [lead, setLead] = useState({ name: "", email: "", status: "New" });
  const [leads, setLeads] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // track which lead is being edited

  useEffect(() => {
    const savedLeads = JSON.parse(localStorage.getItem("leads")) || [];
    setLeads(savedLeads);
  }, []);

  useEffect(() => {
    localStorage.setItem("leads", JSON.stringify(leads));
  }, [leads]);

  const addOrUpdateLead = (e) => {
    e.preventDefault();

    if (!lead.name.trim() || !lead.email.trim()) {
      alert("Please fill in all fields");
      return;
    }

    if (editIndex !== null) {

      const updatedLeads = leads.map((item, index) =>
        index === editIndex ? lead : item
      );
      setLeads(updatedLeads);
      setEditIndex(null);
      alert("Lead updated successfully!");
    } else {
      // Add new lead
      setLeads([...leads, lead]);
      alert("Lead added successfully!");
    }

    // Reset form
    setLead({ name: "", email: "", status: "New" });
  };

  const editLead = (index) => {
    setLead(leads[index]);
    setEditIndex(index);
  };

  const deleteLead = (index) => {
    if (confirm("Are you sure you want to delete this lead?")) {
      const updatedLeads = leads.filter((_, i) => i !== index);
      setLeads(updatedLeads);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Leads</h3>

      <form onSubmit={addOrUpdateLead} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Lead Name"
              value={lead.name}
              onChange={(e) => setLead({ ...lead, name: e.target.value })}
              required
            />
          </div>
          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={lead.email}
              onChange={(e) => setLead({ ...lead, email: e.target.value })}
              required
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={lead.status}
              onChange={(e) => setLead({ ...lead, status: e.target.value })}
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
            </select>
          </div>
          <div className="col-md-1">
            <button className="btn btn-primary w-100">
              {editIndex !== null ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </form>

      {leads.length === 0 ? (
        <p className="text-center text-muted">No leads yet. Add one above!</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Lead Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l, i) => (
              <tr key={i}>
                <td>{l.name}</td>
                <td>{l.email}</td>
                <td>{l.status}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => editLead(i)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteLead(i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leads;

