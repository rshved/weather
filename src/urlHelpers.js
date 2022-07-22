export const getSearchParams = () => {
  return Object.fromEntries(
    new URL(window.location).searchParams.entries()
  );
}

export const pushHistoryState = (page) => {
  window.history.pushState(
    null,
    document.title,
    `${window.location.pathname}?page=${page}`
  );
}