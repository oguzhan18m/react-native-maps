export const changeNameSurname = async (name, surname) => {
  const response = await fetch(
    'https://n2-mobile-2dbf3-default-rtdb.firebaseio.com/userDetails.json',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        surname,
      }),
    },
  );

  const resData = await response.json();
  console.log(resData);
};
