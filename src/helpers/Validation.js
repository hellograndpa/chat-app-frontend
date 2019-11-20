export const emptyValidation = (array, handleSetMessage) => {
  if (array && array.length <= 0) {
    handleSetMessage({ typeMessage: 'alert', message: 'There are is no result with this search!' });
  }
};
export const errorValidations = (error, handleSetMessage) => {
  handleSetMessage({ typeMessage: 'error', message: `${error}` });
};
