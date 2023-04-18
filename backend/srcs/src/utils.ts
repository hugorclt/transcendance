const fs = require('fs');

export function generateBase64Image(path) {
    const buffer = fs.readFileSync(path);
    const base64String = buffer.toString('base64');
    return base64String;
}

export const defaultAvatar = {
  avatar: generateBase64Image("/app/assets/defaultImage/avatar.png"),
  group: generateBase64Image("/app/assets/defaultImage/group-chat.png"),
}
  