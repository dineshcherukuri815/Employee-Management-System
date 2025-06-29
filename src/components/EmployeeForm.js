import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'HR',
  'Finance',
  'Support',
  'Operations',
  'Product',
  'Design'
];

const EmployeeForm = ({ onSubmit, getEmployee }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    hireDate: '',
    salary: '',
    address: ''
  });

  useEffect(() => {
    if (isEdit && getEmployee) {
      const emp = getEmployee(id);
      if (emp) {
        setForm({
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          phone: emp.phone,
          department: emp.department,
          position: emp.position,
          hireDate: emp.hireDate,
          salary: emp.salary,
          address: emp.address || ''
        });
      }
    }
  }, [id, isEdit, getEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.department ||
      !form.position ||
      !form.hireDate ||
      !form.salary
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    if (isEdit) {
      onSubmit(parseInt(id), form);
    } else {
      onSubmit({ ...form, salary: Number(form.salary) });
    }
    navigate('/employees');
  };

  return (
    <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>
        {isEdit ? 'Edit Employee' : 'Add New Employee'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">First Name *</label>
          <input
            type="text"
            name="firstName"
            className="form-input"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Last Name *</label>
          <input
            type="text"
            name="lastName"
            className="form-input"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Phone *</label>
          <input
            type="text"
            name="phone"
            className="form-input"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Department *</label>
          <select
            name="department"
            className="form-select"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">Position *</label>
          <input
            type="text"
            name="position"
            className="form-input"
            value={form.position}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hire Date *</label>
          <input
            type="date"
            name="hireDate"
            className="form-input"
            value={form.hireDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Salary ($) *</label>
          <input
            type="number"
            name="salary"
            className="form-input"
            value={form.salary}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className="form-input"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '2rem' }}>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/employees')}>Cancel</button>
          <button type="submit" className="btn btn-primary">
            {isEdit ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm; 