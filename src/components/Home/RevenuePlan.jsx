import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RingLoader } from 'react-spinners';
import DataTableComponent from '../reusable/DataTableComponent';
import axios from 'axios';
import EditPlan from '../Home/revenueplan/Editplan';
import { useNavigate } from 'react-router-dom';
import AddRevenuePlan from '../Home/revenueplan/AddRevenuePlan';

const RevenuePlan = () => {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addPlanDialogVisible, setAddPlanDialogVisible] = useState(false); 
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
    setAddPlanDialogVisible(true); 
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

  const handleActiveChange = async (planId, newStatus) => {
    const updatedPlan = data.find(plan => plan.id === planId);
    updatedPlan.active = newStatus;
    setData(data.map(item => (item.id === planId ? updatedPlan : item)));

    // try {
    //   await axios.put(`https://ilipaone.com/api/revenue-plans/${planId}`, updatedPlan);
    //   setData(data.map(item => (item.id === planId ? updatedPlan : item)));
    // } catch (error) {
    //   console.error('Error updating active status:', error);
    // }
  };

  const columns = [
    { field: 'title', header: 'Title' },
    { field: 'range', header: 'Range' },
    { field: 'prize', header: 'Amount' },
    { field: 'active', header: 'Active' }
  ];

  return (
    <div> <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <Button
              label="Add Revenue Plan"
              style={{ margin: '5px', backgroundColor: '#06163A', borderRadius: '10px' }}
              onClick={handleAddRevenueClick} 
            />
          </div>
      {loading ? (
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <RingLoader color="#06163A" />
        </div>
      ) : (
        <>
         
          <DataTableComponent
            header="Revenue Plan"
            columns={columns}
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSwitchChange={handleActiveChange}
            showEdit={true}
            showdelete={true}
            showReceipt={false}
            showDollar={false}
            showActions={true} 
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
                    style={{ background: '#06163A', borderRadius: '25px' }}
                  />
                  <Button 
                    label="No" 
                    icon="pi pi-times" 
                    className="p-button-danger" 
                    onClick={() => setDeleteDialogVisible(false)} 
                    style={{ borderRadius: '25px' }}
                  />
                </div>
              </div>
            </Dialog>
          )}
          <Dialog
            header="Add New Revenue Plan"
            visible={addPlanDialogVisible}
            onHide={() => setAddPlanDialogVisible(false)}
            style={{ width: '50vw' }}
          >
            <AddRevenuePlan />
          </Dialog>
        </>
      )}
    </div>
  );
};

export default RevenuePlan;
