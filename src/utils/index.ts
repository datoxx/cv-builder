
export const filterFromArray = (arr: any) => {
    return arr?.filter((obj: any) => checkObjectFields(obj))
  }

  const checkObjectFields = (obj: any) => {
    const keyes = Object.keys(obj)
    let isFilled = false
  
    keyes.forEach((key) => {
      if (obj[key]?.length && !isFilled) {
        isFilled = true
      }
    })
    return isFilled
  }



