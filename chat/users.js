const users = [];

export const addUser = ({ id, userName, room }) => {
  // Data cleaning
  userName = userName.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Data validation
  if (!userName || !room) {
    return {
      error: 'Username and room required',
    };
  }

  // Check user exists
  const existingUser = users.find((user) => {
    return user.userName === userName && user.room === room;
  });

  if (existingUser) {
    return { error: 'User already exists!' };
  }

  const user = { id, userName, room };
  users.push(user);
  return { user };
};

export const removeUser = (id) => {
  const index = users.find((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id) => {
  return users.find((user) => user.id === id);
};

export const getUsersInRoom = (room) => {
  room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};
