export const updateCachedUser = async (user) => {
  const cachedUser = JSON.parse(localStorage.getItem(user.name));

  if (!cachedUser) {
    localStorage.setItem(user.name, JSON.stringify({ maxScore: user.score }));
  } else {
    if (cachedUser.maxScore < user.score) {
      localStorage.setItem(user.name, JSON.stringify({ maxScore: user.score }));
    }
  }
};

export const getAllUsersFromLocalStorage = () => {
  let usersToLeaderboard = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    usersToLeaderboard.push([
      keys[i],
      JSON.parse(localStorage.getItem(keys[i])).maxScore,
    ]);
  }
  return usersToLeaderboard;
};
