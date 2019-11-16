/* eslint-disable import/prefer-default-export */
export const emptyValidation = (array, handleSetMessage) => {
  if (array && array.length <= 0) {
    console.log('empty');
    handleSetMessage({ typeMessage: 'Alert', message: 'There are any result with this search' });
  }
};
export const errorValidations = (error, handleSetMessage) => {
  handleSetMessage({ typeMessage: 'Error', message: `${error}` });
};
