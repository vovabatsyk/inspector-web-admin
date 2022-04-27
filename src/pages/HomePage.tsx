import React from 'react'
import { Notices } from '../components/Notices'
import { Payment } from '../components/Payment'
import { Questions } from '../components/Questions'

const HomePage = () => {
	return (
		<div>
			<Notices />
			<Questions />
			<Payment />
		</div>
	)
}

export default HomePage
