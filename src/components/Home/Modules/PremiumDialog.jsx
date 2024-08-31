import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'primereact/button';
import InputComponent from '../../reusable/InputComponent'; // Adjust the path if necessary

// Define validation schema with Yup
const validationSchema = Yup.object().shape({
  no_of_users: Yup.number().required('Number of users is required').integer('Must be an integer'),
  storage: Yup.number().required('Storage is required'),
  fee: Yup.number().required('Fee is required'),
});

const PremiumDialog = ({ module, onConfirm, onCancel }) => {
  if (!module) return null; // Ensure module is available

  const initialValues = {
    no_of_users: module.no_of_users || '',
    storage: module.storage || '',
    fee: module.fee || '',
  };

  const handleSubmit = (values) => {
    // Pass values to parent or handle them here
    onConfirm(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <p>Are you sure you want to {module.active ? 'deactivate' : 'activate'} the Premium status for {module.name}?</p>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <Field
                  as={InputComponent}
                  label="Number of Users"
                  name="no_of_users"
                  type="number"
                />
                {/* <ErrorMessage name="no_of_users" component="div" style={{ color: 'red' }} /> */}
              </div>
              <div style={{ flex: 1 }}>
                <Field
                  as={InputComponent}
                  label="Storage (MB)"
                  name="storage"
                  type="number"
                />
                {/* <ErrorMessage name="storage" component="div" style={{ color: 'red' }} /> */}
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' ,width:'49%'}}>
              <Field
                as={InputComponent}
                label="Fee"
                name="fee"
                type="number"
              />
              {/* <ErrorMessage name="fee" component="div" style={{ color: 'red' }} /> */}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <Button 
                label={module.active ? 'Deactivate' : 'Activate'}
                icon="pi pi-check" 
                type="submit" 
                disabled={isSubmitting} 
                style={{ background: '#06163A', borderRadius: '25px', marginLeft: '10px' }}
              />
              <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-danger"

                onClick={onCancel}
                style={{ borderRadius: '25px' }}
              />
              
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PremiumDialog;
