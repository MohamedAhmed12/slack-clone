// [{path: 'email', message: 'does not exist'}]
/*
{
  email: ['err1', 'err2'...]
}
*/

export default (errors) =>
    errors.reduce((accumulator, currentVal) => {
        if (currentVal.path in accumulator) {
            accumulator[currentVal.path].push(currentVal.message);
        } else {
            accumulator[currentVal.path] = [currentVal.message];
        }

        return accumulator;
    }, {});
