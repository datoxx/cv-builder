
function GeneralCv({general, image}: any) {

  return (
    <div>

        { general?.name  }
        {general?.surname }

        {image ? <img src={image} alt="education" /> : null}
        {general?.about_me}
        {general?.email}
        {general?.phone_number}

    </div>
  )
}

export default GeneralCv

