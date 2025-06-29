import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Edit, Trash2, Eye, Plus } from 'lucide-react';
import { format } from 'date-fns';

const EmployeeList = ({ employees, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Get unique departments for filter
  const departments = [...new Set(employees.map(emp => emp.department))];

  // Filter employees based on search and filters
  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDelete(id);
    }
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '700',
          color: '#1f2937',
          margin: 0
        }}>
          Employees ({filteredEmployees.length})
        </h2>
        <Link to="/employees/add" className="btn btn-primary">
          <Plus size={16} />
          Add Employee
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="search-bar">
        <div className="search-input">
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{
              position: 'absolute',
              left: '0.75rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#6b7280'
            }} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="form-select filter-select"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="form-select filter-select"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Employee Grid */}
      {filteredEmployees.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '1rem' }}>👥</div>
          <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>No employees found</h3>
          <p style={{ color: '#9ca3af' }}>
            {searchTerm || statusFilter !== 'all' || departmentFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first employee'
            }
          </p>
          {!searchTerm && statusFilter === 'all' && departmentFilter === 'all' && (
            <Link to="/employees/add" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              <Plus size={16} />
              Add First Employee
            </Link>
          )}
        </div>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.map(employee => (
            <div key={employee.id} className="employee-card">
              <div className="employee-header">
                <div className="employee-avatar">
                  {getInitials(employee.firstName, employee.lastName)}
                </div>
                <div className="employee-info">
                  <h3>{employee.firstName} {employee.lastName}</h3>
                  <p>{employee.position}</p>
                </div>
                <span className={`badge ${employee.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
                  {employee.status}
                </span>
              </div>
              
              <div className="employee-details">
                <div className="detail-item">
                  <span className="detail-label">Department</span>
                  <span className="detail-value">{employee.department}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{employee.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{employee.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Hire Date</span>
                  <span className="detail-value">
                    {format(new Date(employee.hireDate), 'MMM dd, yyyy')}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Salary</span>
                  <span className="detail-value">${employee.salary.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="employee-actions">
                <Link 
                  to={`/employees/${employee.id}`}
                  className="btn btn-secondary"
                  style={{ textDecoration: 'none' }}
                >
                  <Eye size={14} />
                  View
                </Link>
                <Link 
                  to={`/employees/edit/${employee.id}`}
                  className="btn btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Edit size={14} />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(employee.id, `${employee.firstName} ${employee.lastName}`)}
                  className="btn btn-danger"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeList; 