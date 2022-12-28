import React from 'react'
import { connect } from 'react-redux'

export const ProductsPage = (props) => {
  return (
	<div>ProductsPage</div>
  )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage)