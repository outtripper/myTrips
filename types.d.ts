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
    description: string
  }, 
  program: {
    id: string,
    description: string,
    photoGallery: Array<string>,
    programInfo:Array<{
      id: string,
      title: string,
      text: string,
      photos: Array<string>   
    }>,
    contactInfo: Array<{
      kind:string,
      text: string,
      value: string
    }>
  },
  dates: {
    from: number,
    to: number
  }
}