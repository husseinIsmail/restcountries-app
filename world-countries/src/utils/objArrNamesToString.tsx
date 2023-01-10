interface ObjWithName {
  name: string
}

export const objArrNamesToString = (objectArr: ObjWithName[]): string => {
  return objectArr.map((objectWithName: ObjWithName, index) => {
    if (index === 0) return `${objectWithName.name}`;
    else return ` ${objectWithName.name}`;
  }).toString();
};
