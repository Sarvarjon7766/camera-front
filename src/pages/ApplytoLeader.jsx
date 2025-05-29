import React, {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const ApplytoLeader = () => {
	const permission = true
	const navigate = useNavigate()

	useEffect(()=>{
		if(!permission){
			navigate('/')
		}
	},[])

	return (
		<div>ApplytoLeader</div>
	)
}

export default ApplytoLeader