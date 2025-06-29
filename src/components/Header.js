import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, BarChart3, Plus } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>
              Employee Management System
            </h1>
          </div>
          
          <nav style={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <Link 
              to="/dashboard"
              className={`btn ${isActive('/dashboard') ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textDecoration: 'none' }}
            >
              <BarChart3 size={16} />
              Dashboard
            </Link>
            
            <Link 
              to="/employees"
              className={`btn ${isActive('/employees') ? 'btn-primary' : 'btn-secondary'}`}
              style={{ textDecoration: 'none' }}
            >
              <Users size={16} />
              Employees
            </Link>
            
            <Link 
              to="/employees/add"
              className="btn btn-success"
              style={{ textDecoration: 'none' }}
            >
              <Plus size={16} />
              Add Employee
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 