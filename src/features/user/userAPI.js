const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://biz2x-backend-project-backend.onrender.com';

export async function fetchLoggedInUserOrders() {
  try {
    const response = await fetch(`http://localhost:8080/orders/user/`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      // Handle HTTP errors (like 401, 404, 500)
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("response data --->>>", data);
    return { data };
  } catch (error) {
    console.error("Error fetching user orders --->>>", error);
    return { error: error.message || 'Something went wrong' };
  }
}


export function fetchLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch(`${BASE_URL}/users/own`, {
      credentials: 'include',
    })
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/users/` + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
    });
    const data = await response.json();
    resolve({ data });
  });
}



