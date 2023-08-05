import { useState, useEffect, FormEvent } from 'react';
import { findNodeByKey } from './helpers';
import { useUpdateTimerMutation } from '../../slices/slices';
import { TableNode } from './types';
import { InputText } from 'primereact/inputtext';
import { useLocalStorage } from '../../hooks/useLocalStorage';
const EditorTemplate = ({
  tableNodes,
  options,
}: {
  tableNodes: TableNode[];
  options: TableNode;
}) => {
  const [currentUserId] = useLocalStorage('user', null);

  const [currentNode, setCurrentNode] = useState<TableNode>();
  const [newDescription, setNewDescription] = useState('');
  const [updateTimer] = useUpdateTimerMutation();
  const onDescriptionSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataToSave = currentNode?.data;
    if (dataToSave) {
      dataToSave.description = newDescription;
      dataToSave.userId = currentUserId;
      updateTimer(dataToSave);
    }
  };

  useEffect(() => {
    const newNodes = JSON.parse(JSON.stringify(tableNodes));
    const editedNode = findNodeByKey(newNodes, options.key);
    setCurrentNode(editedNode);
  }, [tableNodes, options.key]);

  return (
    <form onSubmit={onDescriptionSubmit}>
      <InputText
        placeholder="description"
        defaultValue={currentNode?.data?.description}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          setNewDescription(target.value);
        }}
      />
    </form>
  );
};

export default EditorTemplate;
