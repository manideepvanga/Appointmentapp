import {v4} from 'uuid'
import {Component} from 'react'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    islike: false,
    appointmentlist: [],
    isstarred: false,
  }

  onTitleChange = event => {
    this.setState({title: event.target.value})
  }

  onDateChange = event => {
    this.setState({date: event.target.value})
  }

  AddAppointment = event => {
    const {title, islike, date} = this.state
    event.preventDefault()

    const newobj = {
      id: v4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      islike,
    }
    this.setState(prevState => ({
      appointmentlist: [...prevState.appointmentlist, newobj],
      title: '',
      date: '',
    }))
  }

  staradded = ider => {
    this.setState(prevState => ({
      appointmentlist: prevState.appointmentlist.map(each => {
        if (each.id === ider) {
          return {...each, islike: !each.islike}
        }
        return each
      }),
    }))
  }

  Filterlist = event => {
    const {isstarred} = this.state
    this.setState(prevState => ({isstarred: !prevState.isstarred}))
  }

  Starredlist = () => {
    const {appointmentlist} = this.state
    const thelist = appointmentlist.filter(each => each.islike === true)
    return thelist
  }

  render() {
    const {appointmentlist, isstarred, title, date} = this.state
    const starlist = this.Starredlist()
    const maplist = isstarred ? starlist : appointmentlist
    const buttonclass = isstarred ? 'act' : 'nonact'
    return (
      <div className="container">
        <div className="content">
          <div className="topcontainer">
            <div className="side1">
              <h1>Add Appointment</h1>
              <form className="form" type="form" onSubmit={this.AddAppointment}>
                <label htmlFor="title">TITLE</label>
                <input
                  onChange={this.onTitleChange}
                  value={title}
                  id="title"
                  type="text"
                  placeholder="Title"
                />
                <label htmlFor="date">DATE</label>
                <input
                  onChange={this.onDateChange}
                  id="date"
                  type="date"
                  value={date}
                  placeholder="dd/mm/yyyy"
                />
                <button className="addbutton" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="bottomcontainer">
            <div className="bottomtopline">
              <h1>Appointments</h1>
              <button className={buttonclass} onClick={this.Filterlist}>
                Starred
              </button>
            </div>
            <ul className="unorder">
              {maplist.map(each => (
                <AppointmentItem
                  key={each.id}
                  item={each}
                  staradded={this.staradded}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
