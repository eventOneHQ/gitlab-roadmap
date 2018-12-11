import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import 'babel-polyfill'

import './Widget.scss'

const baseUrl = process.env.GL_RM_INT_CONFIG_BASE_URL

if (!baseUrl) {
  throw new Error('Base URL is required.')
}

const Issue = props => {
  let closed
  if (props.state === 'closed') {
    closed = <span className="badge badge-primary badge-pill">delivered</span>
  } else {
    closed = ''
  }

  return (
    <a href={props.web_url} className="list-group-item list-group-item-action">
      {props.title}
      <small className="mx-2">
        #{props.iid} {closed}
      </small>
    </a>
  )
}
Issue.propTypes = {
  web_url: PropTypes.string,
  title: PropTypes.string,
  iid: PropTypes.number,
  state: PropTypes.string
}

const Sprint = props => {
  let issues

  if (props.issues.length > 0) {
    issues = props.issues.map(issue => <Issue key={issue.id} {...issue} />)
  } else {
    issues = <li className="list-group-item">No Milestones</li>
  }

  return (
    <div className="col-lg-2 col-md-4">
      <div className="card">
        <div className="card-header">{props.label.name}</div>
        <div className="list-group list-group-flush">{issues}</div>
      </div>
    </div>
  )
}
Sprint.propTypes = {
  issues: PropTypes.array,
  label: PropTypes.object
}

class Widget extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      sprints: []
    }
  }
  async componentDidMount () {
    const sprints = await axios.get(`${baseUrl}/api/v1/roadmap`)
    this.setState({ sprints: sprints.data.lists })
  }
  render () {
    return (
      <div className="bootstrap">
        <div className="container-fluid">
          <div className="row">
            {this.state.sprints.map(sprint => (
              <Sprint key={sprint.id} {...sprint} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Widget
