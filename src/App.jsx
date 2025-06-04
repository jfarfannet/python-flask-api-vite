import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './components/Menu';
import Modal from './components/Modal';
import ProductList from './components/products/ProductList';
import ProductForm from './components/products/ProductForm';
import ClientList from './components/clients/ClientList';
import ClientForm from './components/clients/ClientForm';

const App = () => {
  const [view, setView] = useState('products');
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/products/');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:8000/clients/');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchClients();
  }, []);

  return (
    <div>
      <h1>Management System</h1>
      <Menu onNavigate={setView} />
      <button onClick={() => setIsModalOpen(true)}>Add New</button>
      {view === 'products' && (
        <ProductList products={products} onProductDeleted={fetchProducts} />
      )}
      {view === 'clients' && (
        <ClientList clients={clients} onClientDeleted={fetchClients} />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {view === 'products' && (
          <ProductForm onProductAdded={() => { fetchProducts(); setIsModalOpen(false); }} />
        )}
        {view === 'clients' && (
          <ClientForm onClientAdded={() => { fetchClients(); setIsModalOpen(false); }} />
        )}
      </Modal>
    </div>
  );
};

export default App;
