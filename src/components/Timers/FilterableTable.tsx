import React, { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import EditorTemplate from './editorTemplate';
import { ActionTemplate } from './actionTemplate';

const FilterableTable = ({ tableNodes }: { tableNodes: any }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const getHeader = () => {
    return (
      <div className="flex justify-content-end">
        <div className="p-input-icon-left">
          <i className="pi pi-search"></i>
          <InputText
            type="search"
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              return setGlobalFilter(target.value);
            }}
            placeholder="Global Search"
          />
        </div>
      </div>
    );
  };

  let header = getHeader();

  return (
    <div className="card">
      <TreeTable
        value={tableNodes}
        globalFilter={globalFilter}
        header={header}
        filterMode="lenient"
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column
          field="description"
          body={(options) => (
            <EditorTemplate tableNodes={tableNodes} options={options} />
          )}
        ></Column>
        <Column field="timer" header="Timer"></Column>
        <Column field="createdAt" header="Created at"></Column>
        <Column
          header="Actions"
          body={(options) => (
            <ActionTemplate nodes={tableNodes} options={options} />
          )}
        ></Column>
      </TreeTable>
    </div>
  );
};

export default FilterableTable;
