type User = {
  userName: string,
  firstName: string,
  lastName: string,
  avatar: string
}

type MyTrip = {
  id: string,
  destination: {
    id: string,
    description: string,
  }, 
  program: {
    id: string,
    description: string,
    photoGallery: Array<string>
  },
  dates: {
    from: number,
    to: number
  }
}