import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('luxe_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Check for admin credentials
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      const adminUser = {
        id: 'admin',
        name: 'Admin',
        email: email,
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('luxe_user', JSON.stringify(adminUser));
      return { success: true, role: 'admin' };
    }

    // Check for client in localStorage
    const clients = JSON.parse(localStorage.getItem('luxe_clients') || '[]');
    const client = clients.find(c => c.email === email && c.password === password);

    if (client) {
      setUser(client);
      localStorage.setItem('luxe_user', JSON.stringify(client));
      return { success: true, role: 'client' };
    }

    return { success: false, message: 'Invalid credentials' };
  };

  const signup = (name, email, password, phone) => {
    // Check if email already exists
    const clients = JSON.parse(localStorage.getItem('luxe_clients') || '[]');
    
    if (clients.find(c => c.email === email)) {
      return { success: false, message: 'Email already registered' };
    }

    // Create new client
    const newClient = {
      id: Date.now().toString(),
      name,
      email,
      password,
      phone,
      role: 'client',
      createdAt: new Date().toISOString()
    };

    clients.push(newClient);
    localStorage.setItem('luxe_clients', JSON.stringify(clients));

    // Set user
    setUser(newClient);
    localStorage.setItem('luxe_user', JSON.stringify(newClient));

    return { success: true, role: 'client' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('luxe_user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAdmin: user?.role === 'admin',
    isClient: user?.role === 'client'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;