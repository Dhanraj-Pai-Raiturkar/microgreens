const castValue = (value: any) => {
  try {
    return !isNaN(+value) ? +value : value;
  } catch (error: any) {
    console.error(
      'castValue error',
      error,
      JSON.stringify(error),
      error?.message
    );
  }
};

export { castValue };
