export const createNewLocation = async (title, region) => {

  const response = await fetch(
    'https://n2-mobile-2dbf3-default-rtdb.firebaseio.com/locations.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        region,
      }),
    },
  );

  const resData = await response.json();
  console.log(resData);
};

