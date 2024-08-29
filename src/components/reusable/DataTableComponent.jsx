import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import 'primeicons/primeicons.css';
import '../../css/DataTableComponent.css';

const DataTableComponent = ({showinfo2, header, oninfo2,columns, data, onSwitchChange, onPremiumChange, onEdit, onReceipt, onDelete, showEdit, showReceipt, showDollar, showinfo, oninfo, showdelete, showActions }) => {

  const switchTemplate = (rowData, field, onChange) => (
    <div className="switch-container">
      <InputSwitch 
        checked={rowData[field] === 1} 
        onChange={(e) => onChange && onChange(rowData.id, e.value)} 
      />
    </div>
  );

  const actionTemplate = (rowData) => (
    <div className="action-buttons">
      {showinfo2 && (
        <Button
          icon="pi pi-info-circle"
          className={`p-button-primary p-button-sm action-button button-dollars`}
          onClick={() => oninfo2(rowData)}
        />
      )}
      {showEdit && (
        <Button
          icon="pi pi-pencil"
          className={`p-button-primary p-button-sm action-button button-edit`}
          onClick={() => onEdit(rowData.id)}
        />
      )}
      {showReceipt && (
        <Button
          icon="pi pi-receipt"
          className={`p-button-primary p-button-sm action-button button-receipt`}
          onClick={() => onReceipt(rowData)}
        />
      )}
      {showdelete && (
        <Button
          icon="pi pi-trash"
          className={`p-button-danger p-button-sm action-button button-delete`}
          onClick={() => onDelete(rowData.id)}
        />
      )}
      {showinfo && (
        <Button
          icon="pi pi-info-circle"
          className={`p-button-success p-button-sm action-button button-info`}
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
          <Column header="Actions" body={actionTemplate} headerStyle={{ backgroundColor: "#06163A", color: 'white', textAlign: 'center' }} />
        )}
      </DataTable>
    </div>
  );
};

export default DataTableComponent;
