import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import 'primeicons/primeicons.css';

const DataTableComponent = ({ columns, data, onSwitchChange, onPremiumChange, onEdit, onDelete, showEdit }) => {

  const switchTemplate = (rowData, field, onChange) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <InputSwitch 
          checked={rowData[field]} 
          onChange={(e) => onChange && onChange(e, rowData.id)} 
        />
      </div>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          icon="pi pi-pencil"
          className="p-button-primary p-button-sm"
          style={{
            marginRight: '8px',
            color: '#fff',
            textAlign: 'center'
          }}
          onClick={() => onEdit(rowData.id)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-sm"
          style={{
            marginRight: '8px',
            backgroundColor: '#d9534f',
            color: '#fff',
            textAlign: 'center'
          }}
          onClick={() => onDelete(rowData.id)}
        />
        {showEdit && (
          <Button
            icon="pi pi-info-circle"
            className="p-button-success p-button-sm"
            style={{
              marginRight: '8px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              textAlign: 'center'
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div className="datatable-responsive-demo">
      <DataTable value={data} className="p-datatable-responsive border rounded">
        {columns.map((col, index) => (
          <Column 
            key={index} 
            field={col.field} 
            header={col.header} 
            headerStyle={{ backgroundColor: "#434191", color: 'white' }} 
            body={col.field === 'premium' ? 
              (rowData) => switchTemplate(rowData, 'premium', onPremiumChange) :
              col.field === 'active' ?
              (rowData) => switchTemplate(rowData, 'active', onSwitchChange) : 
              col.body}
          />
        ))}
        <Column header="Actions" body={actionTemplate} headerStyle={{ backgroundColor: "#434191", color: 'white' }} />
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
