export default function dateFormatter(timeInMilliseconds) {
  const date = new Date(timeInMilliseconds);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-CA", options);
}
