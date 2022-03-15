export const getURL = () => {
  const url =
    process.env.URL && process.env.URL !== ''
      ? process.env.URL
      : process.env.VERCEL_URL && process.env.VERCEL_URL !== ''
      ? process.env.VERCEL_URL
      : 'http://localhost:3000'
  return url.includes('http') ? url : `https://${url}`
}

export const postData = async ({
  url,
  data
}: {
  url: string;
  data?: {}
}) => {
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data)
  })

  if (!res.ok) throw Error(res.statusText)

  return res.json()
}

export const toDateTime = (secs: number) => {
  var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
  t.setSeconds(secs)
  return t
}

export const validateEmail = (email: string) => {
  return (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email))
}

export const validatePassword = (password: string) => {
  return (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))
}

export const validateFirstLastName = (fullName: string) => {
  const nameArray = fullName.split(' ')
  if (nameArray.length !== 2) return false
  if (
    !(/^[a-z ,.'-]+$/i.test(nameArray[0])) ||
    !(/^[a-z ,.'-]+$/i.test(nameArray[1]))
   ) return false
   return true
}
