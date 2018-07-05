
export const toRealmArray = (array) => {
  return array.map(function (item) {
      return {value: item}
    }
  )
};