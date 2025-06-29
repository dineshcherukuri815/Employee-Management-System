import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, UserX, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = ({ employees }) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.status === 'active').length;
  const inactiveEmployees = employees.filter(emp => emp.status === 'inactive').length;
  const totalSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
  
  const departments = employees.reduce((acc, emp) => {
    acc[emp.department] = (acc[emp.department] || 0) + 1;
    return acc;
  }, {});

  const recentHires = employees
    .filter(emp => emp.status === 'active')
    .sort((a, b) => new Date(b.hireDate) - new Date(a.hireDate))
    .slice(0, 5);

  const stats = [
    {
      icon: <Users size={24} />,
      number: totalEmployees,
      label: 'Total Employees',
      color: '#3b82f6'
    },
    {
      icon: <UserCheck size={24} />,
      number: activeEmployees,
      label: 'Active Employees',
      color: '#10b981'
    },
    {
      icon: <UserX size={24} />,
      number: inactiveEmployees,
      label: 'Inactive Employees',
      color: '#ef4444'
    },
    {
      icon: <DollarSign size={24} />,
      number: `$${totalSalary.toLocaleString()}`,
      label: 'Total Salary',
      color: '#f59e0b'
    }
  ];

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
          Dashboard
        </h2>
        <Link to="/employees/add" className="btn btn-primary">
          Add New Employee
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <div style={{
                color: stat.color,
                display: 'flex',
                alignItems: 'center'
              }}>
                {stat.icon}
              </div>
              <div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
        marginTop: '2rem'
      }}>
        {/* Department Distribution */}
        <div className="card">
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Department Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.entries(departments).map(([dept, count]) => (
              <div key={dept} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <span style={{ fontWeight: '500', color: '#374151' }}>{dept}</span>
                <span style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {count} {count === 1 ? 'employee' : 'employees'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Hires */}
        <div className="card">
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            Recent Hires
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentHires.map(employee => (
              <div key={employee.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                backgroundColor: '#f9fafb',
                borderRadius: '0.5rem'
              }}>
                <div>
                  <div style={{ fontWeight: '500', color: '#374151' }}>
                    {employee.firstName} {employee.lastName}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {employee.position}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  <Calendar size={14} />
                  {format(new Date(employee.hireDate), 'MMM dd, yyyy')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '1rem'
        }}>
          Quick Actions
        </h3>
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link to="/employees" className="btn btn-primary">
            <Users size={16} />
            View All Employees
          </Link>
          <Link to="/employees/add" className="btn btn-success">
            <TrendingUp size={16} />
            Add New Employee
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 