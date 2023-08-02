export const findNodeByKey = (nodes: any, key: any) => {
  let path = key.split('-');
  let node;

  while (path.length) {
    let list: any = node ? node.children : nodes;

    node = list[parseInt(path[0], 10)];
    path.shift();
  }

  return node;
};
