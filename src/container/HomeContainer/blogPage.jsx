import React from 'react'
import { connect } from 'react-redux'

export const BlogPage = (props) => {
  return (
	<div>BlogPage</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPage)