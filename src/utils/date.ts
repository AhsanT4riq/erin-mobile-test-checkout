export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateRange = (startDate: string, endDate: string) => {
  if (!startDate || !endDate) {
    return 'To be confirmed';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return `${start.toLocaleDateString(
    'en-US',
    formatOptions,
  )} - ${end.toLocaleDateString('en-US', formatOptions)}`;
};
