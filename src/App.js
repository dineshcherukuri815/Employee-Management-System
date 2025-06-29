import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeDetail from './components/EmployeeDetail';
import Dashboard from './components/Dashboard';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load employees from localStorage on component mount
  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      // Initialize with sample data
      const sampleEmployees = [
        {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          phone: '+1 (555) 123-4567',
          department: 'Engineering',
          position: 'Senior Developer',
          hireDate: '2022-01-15',
          salary: 85000,
          status: 'active',
          address: '123 Main St, City, State 12345'
        },
        {
          id: 2,
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@company.com',
          phone: '+1 (555) 234-5678',
          department: 'Marketing',
          position: 'Marketing Manager',
          hireDate: '2021-08-20',
          salary: 75000,
          status: 'active',
          address: '456 Oak Ave, City, State 12345'
        },
        {
          id: 3,
          firstName: 'Mike',
          lastName: 'Johnson',
          email: 'mike.johnson@company.com',
          phone: '+1 (555) 345-6789',
          department: 'Sales',
          position: 'Sales Representative',
          hireDate: '2023-03-10',
          salary: 65000,
          status: 'active',
          address: '789 Pine Rd, City, State 12345'
        },
        {
          id: 4,
          firstName: 'Sarah',
          lastName: 'Williams',
          email: 'sarah.williams@company.com',
          phone: '+1 (555) 456-7890',
          department: 'HR',
          position: 'HR Specialist',
          hireDate: '2022-11-05',
          salary: 70000,
          status: 'inactive',
          address: '321 Elm St, City, State 12345'
        },
        {
          id: 5,
          firstName: 'David',
          lastName: 'Brown',
          email: 'david.brown@company.com',
          phone: '+1 (555) 567-8901',
          department: 'Engineering',
          position: 'Frontend Developer',
          hireDate: '2023-06-15',
          salary: 80000,
          status: 'active',
          address: '654 Maple Dr, City, State 12345'
        }
      ];
      setEmployees(sampleEmployees);
      localStorage.setItem('employees', JSON.stringify(sampleEmployees));
    }
    setLoading(false);
  }, []);

  // Save employees to localStorage whenever employees state changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('employees', JSON.stringify(employees));
    }
  }, [employees, loading]);

  const addEmployee = (employee) => {
    const newEmployee = {
      ...employee,
      id: Date.now(),
      status: 'active'
    };
    setEmployees([...employees, newEmployee]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map(emp => 
      emp.id === id ? { ...emp, ...updatedEmployee } : emp
    ));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const getEmployeeById = (id) => {
    return employees.find(emp => emp.id === parseInt(id));
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#6b7280'
      }}>
        Loading Employee Management System...
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route 
              path="/dashboard" 
              element={<Dashboard employees={employees} />} 
            />
            <Route 
              path="/employees" 
              element={
                <EmployeeList 
                  employees={employees}
                  onDelete={deleteEmployee}
                />
              } 
            />
            <Route 
              path="/employees/add" 
              element={<EmployeeForm onSubmit={addEmployee} />} 
            />
            <Route 
              path="/employees/edit/:id" 
              element={
                <EmployeeForm 
                  onSubmit={updateEmployee}
                  getEmployee={getEmployeeById}
                />
              } 
            />
            <Route 
              path="/employees/:id" 
              element={
                <EmployeeDetail 
                  getEmployee={getEmployeeById}
                  onDelete={deleteEmployee}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 