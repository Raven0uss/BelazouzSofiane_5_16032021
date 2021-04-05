const formatTagToText = (tag) => {
  const textTagArray = tag.split("#");
  if (textTagArray.length > 1) {
    if (textTagArray[1].length > 0) return textTagArray[1];
  }
  return "";
};

export { formatTagToText };
