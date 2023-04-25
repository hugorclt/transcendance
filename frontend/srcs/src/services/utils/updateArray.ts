export function mergeParticipants(participants: any[], newParticipants: any[]) {
  const part = newParticipants.map((newUser) => {
    const index = participants.findIndex(
      (participant) => participant.id,
      newUser.id
    );
    if (index == -1) return [...participants, newUser];
    else {
      return { ...participants[index], ...newUser };
    }
  });
  return part;
}

export function updateArray(array: any[], newObj: any) {
  if (!array) {
    const newArray = new Array<any>();
    newArray.push(newObj);
    return newArray;
  }
  const index = array.findIndex((obj) => obj.id === newObj.id);
  if (index === -1) {
    return [...array, newObj];
  } else {
    return array.map((obj, i) => {
      if (i === index) {
        if (newObj.hasOwnProperty("participants")) {
          newObj.participant = mergeParticipants(
            obj.participants,
            newObj.participants
          );
        }
        return { ...obj, ...newObj };
      } else return obj;
    });
  }
}
