const yup = require('yup');
const transactionTypes = require('@map/transactionTypes');

const CreditUpdateSchema = yup.object().shape({
  eventType: yup
    .string()
    .required('Need this field to be filled')
    .test('is-unique', 'Only three types of events are accepted', function test(
      eT
    ) {
      const acceptableEvents = 
        eT === transactionTypes.credit.credit || 
        eT === transactionTypes.credit.payment ||
        eT === transactionTypes.credit.resolve
      if (acceptableEvents) {
        return true;
      }
      return false;
    }),
  amount: yup
    .number()
    .required('need this field to be filled')
    .typeError('only number is accepted')
    .required('need this field to be filled')
    .positive('need this field to be filled')
    .integer('decimal value is not allowed')
});

const CashUpdateSchema = yup.object().shape({
  eventType: yup
    .string()
    .required('Need this field to be filled')
    .test('is-unique', 'Only two types of events are accepted', function test(
      eT
    ) {
      const acceptableEvents = 
        eT === transactionTypes.cash.in || 
        eT === transactionTypes.cash.out 
      if (acceptableEvents) {
        return true;
      }
      return false;
    }),
  amount: yup
    .number()
    .required('need this field to be filled')
    .typeError('only number is accepted')
    .required('need this field to be filled')
    .positive('need this field to be filled')
    .integer('decimal value is not allowed')
});

module.exports = {
  CreditUpdateSchema,
  CashUpdateSchema
};
