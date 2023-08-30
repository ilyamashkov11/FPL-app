import React from 'react'

async function callAPI(endpoint, method = 'GET', data = null) {
    try {
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: data ? JSON.stringify(data) : undefined,
        };
    
        const response = await fetch(endpoint, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        // console.log('AT CALL API - '+responseData)
        return responseData;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}

export default callAPI