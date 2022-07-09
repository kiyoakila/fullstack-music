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
