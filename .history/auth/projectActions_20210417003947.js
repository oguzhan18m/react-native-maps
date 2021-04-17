export const createNewLocation = async (title, region) => {
  //   const token = getState().auth.token;
  //   const userId = getState().auth.userId;

  // any async code you want!
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

  //   dispatch({
  //     type: CREATE_PRODUCT,
  //     productData: {
  //       id: resData.name,
  //       title,
  //       description,
  //       imageUrl,
  //       price,
  //       ownerId: userId,
  //     }
  //   });
};
