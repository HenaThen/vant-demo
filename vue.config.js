const path = require('path')

//引入JSON文件
const cartList = require('./public/data/cart.json')
const goodsInfo = require('./public/data/goods.json')

const axios = require('axios')
module.exports = {
	configureWebpack: {
	    resolve: {
			extensions: ['.js', '.ts', '.vue', '.json'],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@components': resolve('components'),
				'@base': resolve('base'),
				'@common': resolve('common'),
				'@assets': resolve('assets')
			}
		},
	},
	
	devServer: {
		host: 'localhost',
		port: 1234,
		before: app => {
			app.get('/api/cart', (req, res) => {
				let data = {
					errCode: 0,
					data: cartList
				}
				res.json(data)
			})
			
			app.get('/api/goods', (req, res) => {
				let data = {
					errCode: 0,
					data: goodsInfo
				}
				res.json(data)
			})
		}
	}
}

function resolve (dir) {
  return path.join(__dirname, 'src', dir)
}