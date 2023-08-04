import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ActionTemplate } from './actionTemplate';
import EditorTemplate from './editorTemplate';

const TimersTable = ({ tableNodes }: { tableNodes: any }) => {
  return (
    <TreeTable value={tableNodes} tableStyle={{ minWidth: '50rem' }}>
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
  );
};

export default TimersTable;
