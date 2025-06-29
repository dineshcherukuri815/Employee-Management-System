import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Edit, Trash2, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

const EmployeeDetail = ({ getEmployee, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const employee = getEmployee(id);

  if (!employee) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <h3 style={{ color: '#6b7280', marginBottom: '0.5rem' }}>Employee not found</h3>
        <Link to="/employees" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          <ArrowLeft size={16} />
          Back to Employees
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      onDelete(employee.id);
      navigate('/employees');
    }
  };

  return (
    <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/employees')} style={{ padding: '0.5rem' }}>
          <ArrowLeft size={16} />
        </button>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1f2937', margin: 0 }}>
          Employee Details
        </h2>
      </div>
      <div className="employee-header" style={{ marginBottom: '1.5rem' }}>
        <div className="employee-avatar" style={{ width: 56, height: 56, fontSize: '1.5rem' }}>
          {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
        </div>
        <div className="employee-info">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>{employee.firstName} {employee.lastName}</h3>
          <p style={{ color: '#6b7280' }}>{employee.position}</p>
        </div>
        <span className={`badge ${employee.status === 'active' ? 'badge-active' : 'badge-inactive'}`}>
          {employee.status}
        </span>
      </div>
      <div className="employee-details" style={{ marginBottom: '1.5rem' }}>
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
          <span className="detail-value">{format(new Date(employee.hireDate), 'MMM dd, yyyy')}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Salary</span>
          <span className="detail-value">${employee.salary.toLocaleString()}</span>
        </div>
        {employee.address && (
          <div className="detail-item" style={{ gridColumn: '1 / -1' }}>
            <span className="detail-label">Address</span>
            <span className="detail-value">{employee.address}</span>
          </div>
        )}
      </div>
      <div className="employee-actions" style={{ justifyContent: 'flex-end' }}>
        <Link 
          to={`/employees/edit/${employee.id}`}
          className="btn btn-primary"
          style={{ textDecoration: 'none' }}
        >
          <Edit size={16} />
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail; 