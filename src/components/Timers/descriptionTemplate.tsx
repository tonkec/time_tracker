import { useEffect, useState } from 'react';
import { TableNode } from './types';
import { findNodeByKey } from './helpers';
const DescriptionTemplate = ({
  tableNodes,
  options,
}: {
  tableNodes: TableNode[];
  options: TableNode;
}) => {
  const [currentNode, setCurrentNode] = useState<TableNode>();
  useEffect(() => {
    const newNodes = JSON.parse(JSON.stringify(tableNodes));
    const editedNode = findNodeByKey(newNodes, options.key);
    setCurrentNode(editedNode);
  }, [tableNodes, options.key]);
  return <p>{currentNode?.data.description}</p>;
};

export default DescriptionTemplate;
