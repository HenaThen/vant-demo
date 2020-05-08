import axios from 'axios'

export function getRequest (target, params) {
	console.log('-----target-----', target)
	console.log('-----params-----', params)
	return axios.get(target, {
		params: params
	}).then(res => {
		if (res.status === 200) {
			return res.data
		}
	})
}