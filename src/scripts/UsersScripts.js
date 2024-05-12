export const deleteForeverUser = (users, setUsers, userId) => {
    setUsers(users.filter(user => user.userId !== userId));
};

export const changeRights = (users, setUsers, userId, newRole) => {
    if (newRole !== 'ADMIN' && newRole !== 'USER') {
      console.error('Invalid role specified. Must be either "ADMIN" or "USER".');
      return;
    }
  
    const updatedUsers = users.map((user) =>
      user.userId === userId ? { ...user, role: newRole } : user
    );
    
    setUsers(updatedUsers);
};