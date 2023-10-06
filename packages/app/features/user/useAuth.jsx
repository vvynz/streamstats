import React, { useState, useEffect } from 'react'
import axios from 'axios'

export function useAuth(code) {
  const [accessToken, setAccessToken] = useState()

  useEffect(() => {
    axios
      .post('http://localhost:3000/login', {
        code,
      })
      .then((res) => {
        setAccessToken(res.data.accessToken)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [code])
  console.log('from hook AT=', accessToken)
  return accessToken
}
