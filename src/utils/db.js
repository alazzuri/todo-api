export const findElementById = async (repository, id) => {
  return await repository.findOne({ where: { id } });
};

export const findElementByArgs = async (repository, args) => {
  return await repository.findOne({ where: { ...args } });
};
