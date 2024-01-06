const calculateSize = (size: number) => {
  if (size < 1e4) {
    return { size, unit: 'B' };
  } else if (size < 1e6) {
    return { size: size / 1e4, unit: 'KB' };
  } else if (size < 1e9) {
    return { size: size / 1e6, unit: 'MB' };
  } else {
    return { size: size / 1e9, unit: 'GB' };
  }
};

export const getSizeLabel = (bytes: number) => {
  const { size, unit } = calculateSize(bytes);
  return `${size.toPrecision(2)}${unit}`;
};
