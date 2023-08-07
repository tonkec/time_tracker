import { useState } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import EditorTemplate from './editorTemplate';
import { ActionTemplate } from './actionTemplate';
import { TableNode } from './types';
import DescriptionTemplate from './descriptionTemplate';
import { sortByDate } from './helpers';

const FilterableTable = ({ tableNodes }: { tableNodes: TableNode[] }) => {
  const [globalFilter, setGlobalFilter] = useState('');

  const getHeader = () => {
    return (
      <div className="flex justify-content-end mb-6">
        <div
          className="p-input-icon-left"
          style={{ minWidth: '50%', marginRight: '-1rem' }}
        >
          <i className="pi pi-search"></i>
          <InputText
            type="search"
            style={{ width: '100%' }}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              return setGlobalFilter(target.value);
            }}
            placeholder="Search by date, timer or description"
          />
        </div>
      </div>
    );
  };

  const header = getHeader();

  return (
    <div className="card">
      <TreeTable
        value={sortByDate(tableNodes)}
        globalFilter={globalFilter}
        header={header}
        filterMode="lenient"
        tableStyle={{ minWidth: '50rem' }}
        style={{ marginTop: 50 }}
        paginator
        rows={5}
        resizableColumns
      >
        <Column field="timer" header="Timer" style={{ maxWidth: 150 }}></Column>
        <Column
          header="Description"
          body={(options) => (
            <DescriptionTemplate tableNodes={tableNodes} options={options} />
          )}
          editor={(options) => (
            <EditorTemplate tableNodes={tableNodes} options={options.node} />
          )}
        ></Column>
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
