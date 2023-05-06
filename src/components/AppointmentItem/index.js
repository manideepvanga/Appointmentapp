// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {item, staradded} = props
  const {id, date, title, islike} = item

  const StarChange = () => {
    staradded(id)
  }

  const imgurl = islike
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="listitemcontainer">
      <div className="itemcontent">
        <p className="name">{title}</p>
        <button className="starbutton" onClick={StarChange}>
          <img src={imgurl} />
        </button>
      </div>
      <p className="date">Date:{date}</p>
    </li>
  )
}
export default AppointmentItem
