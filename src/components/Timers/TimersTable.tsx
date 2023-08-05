import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ActionTemplate } from './actionTemplate';
import EditorTemplate from './editorTemplate';
import { TableNode } from './types';
import DescriptionTemplate from './descriptionTemplate';

const TimersTable = ({ tableNodes }: { tableNodes: TableNode[] }) => {
  return (
    <TreeTable
      value={tableNodes}
      tableStyle={{ minWidth: '50rem' }}
      paginator
      rows={5}
    >
      <Column
        field="description"
        body={(options) => (
          <DescriptionTemplate tableNodes={tableNodes} options={options} />
        )}
        editor={(options) => (
          <EditorTemplate tableNodes={tableNodes} options={options.node} />
        )}
        onCellEditComplete={() => console.log('complete')}
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
  );
};

export default TimersTable;
