import fetcher from './fetcher'

export const auth = (
  mode: 'signin' | 'signup',
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body)
}

export const createplaylist = (body: { user }) => {
  return fetcher('/createplaylist', body)
}

export const addFavorite = (body: { userId; songId }) => {
  // return fetcher('/addfavorite', body)
  return fetch(`${window.location.origin}/api/addfavorite`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error()
    }
    return res.json()
  })
}
export const delFavorite = (body: { userId; songId }) => {
  return fetch(`${window.location.origin}/api/delfavorite`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error()
    }
    return res.json()
  })
}
