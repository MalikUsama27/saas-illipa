import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import DataTableComponent from '../reusable/DataTableComponent';
import axios from 'axios';
import EditPlan from '../Home/revenueplan/Editplan';  
import { useNavigate } from 'react-router-dom';

const RevenuePlan = () => {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://ilipaone.com/api/revenue-plans');
        if (response.status === 200) {
          setData(response.data);
          
        } else {
          console.error('Failed to fetch data.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddRevenueClick = () => {
    navigate('/dashboard/add-revenue');
  };

  const handleEdit = (id) => {
    const plan = data.find(item => item.id === id);
    setSelectedPlan(plan);
    setEditDialogVisible(true);
  };

  const handleDelete = (id) => {
    setSelectedPlan({ id });
    setDeleteDialogVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://ilipaone.com/api/revenue-plans/${selectedPlan.id}`);
      setData(data.filter(item => item.id !== selectedPlan.id));
    } catch (error) {
      console.error('Error deleting plan:', error);
    } finally {
      setDeleteDialogVisible(false);
      setSelectedPlan(null);
    }
  };

  const handleSaveEdit = async (updatedPlan) => {
    try {
      await axios.put(`https://ilipaone.com/api/revenue-plans/${updatedPlan.id}`, updatedPlan);
      setData(data.map(item => (item.id === updatedPlan.id ? updatedPlan : item)));
    } catch (error) {
      console.error('Error updating plan:', error);
    } finally {
      setEditDialogVisible(false);
      setSelectedPlan(null);
    }
  };

  const columns = [
    { field: 'title', header: 'Title' },
    // { field: 'min_value', header: 'Min Value' },
    { field: 'range', header: 'Range' },
    { field: 'prize', header: 'Amount' },
    { field: 'active', header: 'Active' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
        <Button
          label="Add Revenue Plan"
          style={{ margin: '5px',  backgroundColor: '#06163A',borderRadius:'10px' }}
          onClick={handleAddRevenueClick}
        />
      </div>
      <DataTableComponent
        header="Revenue Plan"
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        showEdit={false}
      />
      {selectedPlan && (
        <Dialog
          visible={editDialogVisible}
          onHide={() => setEditDialogVisible(false)}
          header="Edit Revenue Plan"
          modal
        >
          <EditPlan
            plan={selectedPlan}
            onSave={handleSaveEdit}
            onClose={() => setEditDialogVisible(false)}
          />
        </Dialog>
      )}
      {selectedPlan && (
          <Dialog
          visible={deleteDialogVisible}
          onHide={() => setDeleteDialogVisible(false)}
          header="Confirm Delete"
          modal
          style={{ width: '400px' }}  
        >
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p style={{ marginBottom: '20px', fontSize: '16px' }}>
              Are you sure you want to delete this revenue plan?
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <Button 
                label="Yes" 
                icon="pi pi-check" 
                className="p-button-success" 
                onClick={confirmDelete} 
                style={{background:'#06163A',borderRadius: '25px', }}
              />
              <Button 
                label="No" 
                icon="pi pi-times" 
                className="p-button-danger" 
                onClick={() => setDeleteDialogVisible(false)} 
                style={{borderRadius: '25px', }}
              />
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default RevenuePlan;
