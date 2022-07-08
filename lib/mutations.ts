import fetcher from './fetcher'

export const auth = (
  mode: 'Sign in' | 'Sign up',
  body: { email: string; password: string }
) => {
  return fetcher(`/${mode}`, body)
}
