export const saveItemToLocalStorage = (itemName, itemData) => {
  localStorage.setItem(itemName, JSON.stringify(itemData))
}

export const getItemFromLocalStorage = (itemName) => {
  return JSON.parse(localStorage.getItem(itemName))
}