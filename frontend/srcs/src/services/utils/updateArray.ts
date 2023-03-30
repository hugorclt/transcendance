export function updateArray(array: any[], newObj: any) {
  // console.log("prev: ", array, "new: ", newObj);
  const index = array.findIndex((obj) => obj.id === newObj.id);
  if (index === -1) {
    return [...array, newObj];
  } else {
    return array.map((obj, i) => (i === index ? { ...obj, ...newObj } : obj));
  }
}
