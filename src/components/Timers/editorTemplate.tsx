import { useState, useEffect, FormEvent } from 'react';
import { findNodeByKey } from './helpers';
import { useUpdateTimerMutation } from '../../slices/slices';
const EditorTemplate = ({
  tableNodes,
  options,
}: {
  tableNodes: any;
  options: any;
}) => {
  const [data, setTimerData] = useState<any>({});
  const [updateTimer] = useUpdateTimerMutation();
  const onDescriptionSubmit = (e: FormEvent) => {
    e.preventDefault();
    const dataToSave = data.editedNode.data;
    updateTimer(dataToSave);
  };

  useEffect(() => {
    const newNodes = JSON.parse(JSON.stringify(tableNodes));
    const editedNode = findNodeByKey(newNodes, options.key);
    setTimerData(editedNode.data);
  }, [tableNodes, options.key]);

  return (
    <form onSubmit={onDescriptionSubmit}>
      <input
        type="text"
        placeholder="description"
        value={data.description}
        onChange={(e) => {
          const newNodes = JSON.parse(JSON.stringify(tableNodes));
          const editedNode = findNodeByKey(newNodes, options.key);
          editedNode.data.description = e.target.value;
          setTimerData({ editedNode });
        }}
      />
      <input type="submit" value="Save" />
    </form>
  );
};

export default EditorTemplate;
