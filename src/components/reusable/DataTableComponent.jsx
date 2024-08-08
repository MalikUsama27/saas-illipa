import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import 'primeicons/primeicons.css';
import '../../css/DataTableComponent.css';

const DataTableComponent = ({ header, columns, data, onSwitchChange, onPremiumChange, onEdit, onReceipt, onDelete, showEdit, showReceipt, showDollar, showinfo, oninfo, showdelete, showActions }) => {

 
  const switchTemplate = (rowData, field, onChange) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <InputSwitch 
        checked={rowData[field] === 1} 
        onChange={(e) => onChange && onChange(rowData.id, e.value)} 
      />
    </div>
  );


  const actionTemplate = (rowData) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {showDollar && (
        <Button
          icon="pi pi-dollar"
          className="p-button-primary p-button-sm"
          style={{
            marginRight: '8px',
            color: '#fff',
            textAlign: 'center',
            backgroundColor: '#FF5722', 
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px'
          }}
          onClick={() => onEdit(rowData)}
        />
      )}
      {showEdit && (
        <Button
          icon="pi pi-pencil"
          className="p-button-primary p-button-sm"
          style={{
            marginRight: '8px',
            color: '#fff',
            textAlign: 'center',
            backgroundColor: '#06163A',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px'
          }}
          onClick={() => onEdit(rowData.id)}
        />
      )}
      {showReceipt && (
        <Button
          icon="pi pi-receipt"
          className="p-button-primary p-button-sm"
          style={{
            marginRight: '8px',
            color: '#fff',
            backgroundColor: 'orange',
            textAlign: 'center',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px'
          }}
          onClick={() => onReceipt(rowData)}
        />
      )}
      {showdelete && (
        <Button
          icon="pi pi-trash"
          className="p-button-danger p-button-sm"
          style={{
            marginRight: '8px',
            backgroundColor: '#d9534f',
            color: '#fff',
            textAlign: 'center',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px'
          }}
          onClick={() => onDelete(rowData.id)}
        />
      )}
      {showinfo && (
        <Button
          icon="pi pi-info-circle"
          className="p-button-success p-button-sm"
          style={{
            marginRight: '8px',
            backgroundColor: '#4CAF50',
            color: '#fff',
            textAlign: 'center',
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '12px'
          }}
          onClick={() => oninfo()}
        />
      )}
    </div>
  );

  return (
    <div className="datatable-container">
      {header && <h1 className="table-header">{header}</h1>}
      <DataTable value={data} className="datatable-responsive">
        {columns.map((col, index) => (
          <Column 
            key={index} 
            field={col.field} 
            header={col.header} 
            headerStyle={{ backgroundColor: "#06163A", color: 'white' }} 
            body={col.field === 'status' ? 
              (rowData) => switchTemplate(rowData, 'status', onSwitchChange) : 
              col.body}
          />
        ))}
        {showActions && (
          <Column header="Actions" body={actionTemplate} headerStyle={{ backgroundColor: "#06163A", color: 'white' }} />
        )}
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
