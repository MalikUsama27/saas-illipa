import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import 'primeicons/primeicons.css';
import '../../css/DataTableComponent.css'; 

const DataTableComponent = ({ header, columns, data, onSwitchChange, onPremiumChange, onEdit,onreceipt, onDelete, showEdit ,showreceipt,showdollar}) => {

  const switchTemplate = (rowData, field, onChange) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <InputSwitch 
        checked={rowData[field]} 
        onChange={(e) => onChange && onChange(e, rowData.id)} 
      />
    </div>
  );

  const actionTemplate = (rowData) => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        icon="pi pi-pencil"
        className="p-button-primary p-button-sm"
        style={{
          marginRight: '8px',
          color: '#fff',
          // backgroundColor:'#06163A',
          textAlign: 'center',
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '12px'
        }}
        onClick={() => onEdit(rowData.id)}
      />
      {/* {showdollar&&(
       <Button
        icon="pi pi-dollar"
        className="p-button-primary p-button-sm"
        style={{
          marginRight: '8px',
          color: '#fff',
          textAlign: 'center',
          backgroundColor: '#',
          fontFamily: "'Open Sans', sans-serif",
          fontSize: '12px'
        }}
        onClick={() => onEdit(rowData.id)}
      />)} */}
      {showreceipt && (
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
        onClick={() => onreceipt('')}
      />)}
      
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
      {showEdit && (
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
            body={col.field === 'premium' ? 
              (rowData) => switchTemplate(rowData, 'premium', onPremiumChange) :
              col.field === 'active' ?
              (rowData) => switchTemplate(rowData, 'active', onSwitchChange) : 
              col.body}
          />
        ))}
        <Column header="Actions" body={actionTemplate} headerStyle={{ backgroundColor: "#06163A", color: 'white' }} />
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
