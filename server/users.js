const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );
  if (existingUser) {
    return { error: "Username already exists in the Room" };
  } else {
    const user = { id, name, room };
    users.push(user);
    return { user };
  }
};

const removeUser = (id) => {
  const indexOfUser = users.findIndex((user) => user.id === id);
  if (indexOfUser !== -1) {
    return users.splice(indexOfUser, 1)[0];
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getAllUsersInRoom = (room) => {
  return users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getAllUsersInRoom };
