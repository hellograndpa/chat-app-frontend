/* eslint-disable import/prefer-default-export */
export const emtyValidation = (array, handleSetMessage) => {
  if (array && array.length <= 0) {
    handleSetMessage({ typeMessage: 'Alert', message: 'There are any result with this search' });
  }
};
export const errorValidations = (error, handleSetMessage) => {
  handleSetMessage({ typeMessage: 'Error', message: `${error}` });
};
