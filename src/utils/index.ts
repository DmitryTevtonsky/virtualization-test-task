export const fetcher = async (url: string) => {
  try {
    const responseData = await fetch(url);

    const responseJSON = await responseData.json();

    return responseJSON;
  } catch (error) {
    console.log(error);
  }
};

export const generateFakeData = (pointsCount = 10000) => {
  const data = [];
  for (let i = 0; i < pointsCount; ++i) {
    data.push({
      value: i,
    });
  }
  return data;
};
