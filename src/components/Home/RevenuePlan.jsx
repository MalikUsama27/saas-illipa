import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { RingLoader } from 'react-spinners';
import DataTableComponent from '../reusable/DataTableComponent';
import axios from 'axios';
import EditPlan from '../Home/revenueplan/Editplan';
import AddRevenuePlan from '../Home/revenueplan/AddRevenuePlan';
import DeletePlan from '../Home/revenueplan/Deleteplan';

const RevenuePlan = () => {
  const [data, setData] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [addPlanDialogVisible, setAddPlanDialogVisible] = useState(false); 

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
    setSelectedPlan(plan);
    setDeleteDialogVisible(true);
  };

  const handleSaveEdit = (updatedPlan) => {
    setEditDialogVisible(false);
    fetchData();
  };

  const handleDeleteSuccess = () => {
    setData(data.filter(item => item.id !== selectedPlan.id));
    setDeleteDialogVisible(false);
  };

  const handleActiveChange = async (planId, newStatus) => {
    const updatedPlans = data.map(plan => ({
      ...plan,
      status: plan.id === planId ? (newStatus ? 1 : 0) : 0
    }));

    setData(updatedPlans);

    // try {
    //   // Update each plan's status on the server
    //   await Promise.all(updatedPlans.map(plan =>
    //     axios.patch(`https://ilipaone.com/api/revenue-plans/${plan.id}`, { status: plan.status })
    //   ));
    // } catch (error) {
    //   console.error('Error updating status:', error);
    //   fetchData(); // Re-fetch data to revert any failed status changes
    // }
  };

  const columns = [
    { field: 'title', header: 'Title' },
    { field: 'ranges', header: 'Ranges' }, 
    { field: 'status', header: 'Active' }
  ];

  // Format range data for display
  const formatRanges = (ranges) => {
    return ranges.map((range, index) => (
      <div key={index} style={{padding:'10px'}}>
        {`$${range.min_value} - $${range.max_value} : $${range.prize}`}
      </div>
    ));
  };

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
            data={data.map(plan => ({
              ...plan,
              ranges: formatRanges(plan.ranges) 
            }))}
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
              <DeletePlan
                selectedPlan={selectedPlan}
                onClose={() => setDeleteDialogVisible(false)}
                onDeleteSuccess={handleDeleteSuccess}
              />
            </Dialog>
          )}
          <Dialog
            header="Add New Revenue Plan"
            visible={addPlanDialogVisible}
            onHide={() => {setAddPlanDialogVisible(false)
              fetchData();
            }}
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
