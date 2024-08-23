import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RingLoader } from 'react-spinners';
import DataTableComponent from '../reusable/DataTableComponent';
import axios from 'axios';

import EditPlan from '../Home/revenueplan/Editplan';
import AddRevenuePlan from '../Home/revenueplan/AddRevenuePlan';
import DeletePlan from '../Home/revenueplan/Deleteplan';
import Sure from '../Home/revenueplan/sure';
import Oneplan from '../Home/revenueplan/One';
import { ToastContainer, toast } from 'react-toastify';
import ActivePlan from '../Home/revenueplan/ActivePlan';

const RevenuePlan = () => {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addPlanDialogVisible, setAddPlanDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [activeDialogVisible, setActiveDialogVisible] = useState(false);

  const [planToChange, setPlanToChange] = useState(null);
   // eslint-disable-next-line
  const [newStatus, setNewStatus] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [dialogType, setDialogType] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/revenue-plans`);
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

  useEffect(() => {
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
    const plan = data.find(item => item.id === id);
    const activePlansCount = data.filter(plan => plan.status).length;

    if (plan.status && activePlansCount <= 1) {
      setActiveDialogVisible(true); 
    } else {
      setSelectedPlan(plan);
      setDeleteDialogVisible(true);
    }
  };

  const handleSaveEdit = () => {
    setEditDialogVisible(false);
    fetchData();
  };

  const handleDeleteSuccess = () => {
    setData(data.filter(item => item.id !== selectedPlan.id));
    // toast.success('Plan deleted successfully!');
    setDeleteDialogVisible(false);
    
};

  const handleSwitchChange = (planId, newStatus) => {
    setPlanToChange(planId);
    setNewStatus(newStatus);

    const activePlansCount = data.filter(plan => plan.status).length;
    if (activePlansCount <= 1 && newStatus === false) {
      setShowToast(true);
      setDialogType('oneplan');
      setActiveDialogVisible(true);
    } else {
      setShowToast(false);
      setDialogType('sure');
      setConfirmDialogVisible(true);
    }
  };

  const confirmSwitchChange = async () => {
    if (dialogType === 'oneplan') {
      setActiveDialogVisible(true);
      setConfirmDialogVisible(false);
      return;
    }

    if (showToast) {
      toast.error('Cannot deactivate this plan as it is the only active plan.');
      setConfirmDialogVisible(false);
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/revenue-plans/${planToChange}/toggle-status`);
      fetchData(); 
    } catch (error) {
      console.error('Error updating status:', error);
      fetchData();
    }

    setConfirmDialogVisible(false);
  };

  const columns = [
    { field: 'title', header: 'Title' },
    { 
      field: 'ranges', 
      header: 'Ranges', 
      body: rowData => (
        <div>
          {rowData.ranges.map((range, index) => (
            <div key={index} style={{ padding: '5px' }}>
              {range.max_value_status === 1
                ? `$${range.min_value} + `
                : `$${range.min_value} - $${range.max_value}`}
            </div>
          ))}
        </div>
      )
    },
    { 
      field: 'ranges', 
      header: 'Amount',
      body: rowData => (
        <div>
          {rowData.ranges.map((range, index) => (
            <div key={index} style={{ padding: '5px' }}>
              {`$${range.prize}`}
            </div>
          ))}
        </div>
      )
    },
    { field: 'status', header: 'Default Plan' }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
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
            onSwitchChange={handleSwitchChange}
            showEdit={true}
            showdelete={true}
            showActions={true}
          />
          {selectedPlan && (
            <Dialog
              visible={editDialogVisible}
              onHide={() => setEditDialogVisible(false)}
              header="Edit Revenue Plan"
              style={{ width: '50vw' }}
              modal
            >
              <EditPlan
                plan={selectedPlan}
                onSave={() => {handleSaveEdit(); fetchData();}}
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
              <DeletePlan
                selectedPlan={selectedPlan}
                onClose={() => setDeleteDialogVisible(false)}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </Dialog>
          )}
          {confirmDialogVisible && dialogType === 'sure' && (
            <Sure
              onClose={() => setConfirmDialogVisible(false)}
              onConfirm={confirmSwitchChange}
            />
          )}
          {activeDialogVisible && dialogType === 'oneplan' && (
            <Oneplan
              onClose={() => setActiveDialogVisible(false)}
              onConfirm={() => {
                confirmSwitchChange();
                setActiveDialogVisible(false);
              }}
            />
          )}
          <Dialog
            header={`Add a New Revenue Plan`}
            visible={addPlanDialogVisible}
            onHide={() => setAddPlanDialogVisible(false)}
            style={{ width: '50vw' }}
          >
            <AddRevenuePlan onClose={() => {setAddPlanDialogVisible(false); fetchData();}} />
          </Dialog>
          {/* ActivePlan dialog for error handling */}
          {activeDialogVisible && (
            <ActivePlan
              onClose={() => setActiveDialogVisible(false)}
            />
          )}
        </>
      )}
      <ToastContainer
        position="top-right"
        autoClose={800}
        rtl={false}
        style={{ zIndex: 1300, paddingTop: '55px' }}
      />
    </div>
  );
};

export default RevenuePlan;