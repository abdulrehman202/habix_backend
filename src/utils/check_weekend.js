export default((date = new Date(), weekendDays = [0, 6])=> {
  return weekendDays.includes(date.getDay());
});
