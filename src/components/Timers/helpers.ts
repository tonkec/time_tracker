import { TableNode } from './types';

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
