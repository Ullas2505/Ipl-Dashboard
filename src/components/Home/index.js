import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchData = await response.json()
    console.log(fetchData)
    const updatedData = fetchData.teams.map(eachTeam => ({
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
      id: eachTeam.id,
    }))
    this.setState({teamsData: updatedData, isLoading: false})
  }

  renderingTeamsList = () => {
    const {teamsData} = this.state
    console.log(teamsData)
    return (
      <ul className="team-list-items">
        {teamsData.map(eachTeam => (
          <TeamCard teamData={eachTeam} key={eachTeam.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => {
    ;<div testid="loader" className="loader-container">
      <Loader type="Rings" color="#00bfff" height={80} width={80} />
    </div>
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderingTeamsList()}
        </div>
      </div>
    )
  }
}
export default Home
