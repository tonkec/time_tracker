import { TableNode, Timer } from './types';

export const findNodeByKey = (nodes: TableNode[], key: string) => {
  let path = key.split('-');
  let node;

  while (path.length) {
    let list: any = node ? node.children : nodes;

    node = list[parseInt(path[0], 10)];
    path.shift();
  }

  return node;
};

export const sortByDate = (nodes: TableNode[]) => {
  return nodes.sort((a, b) => {
    const bDate = new Date(b.data.createdAt).valueOf();
    const aDate = new Date(a.data.createdAt).valueOf();
    return bDate - aDate;
  });
};
