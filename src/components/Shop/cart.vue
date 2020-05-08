<template>
	<div class="container">
		<base-header title="购物车"></base-header>
		<base-scroll class="cart-list" :click="scrollConfig.click">
			<div id="cart-list-container">
				<div 
					v-for="(shop, index) in cart" 
					:key="index" 
					class="shop">
					<div class="shop-name">
						<div class="select">
							<div 
								@click="_selectShop(shop.shop_id, index)"
								:class="{'active-select-buttom': selectShop.indexOf(index) !== -1}" 
								class="select-buttom">
								<van-icon color="#fff" name="success"></van-icon>
							</div>
						</div>
						<div class="name">
							{{shop.shop}}<img class="icon" src="../../assets/icon/rightarrow.png">
						</div>
					</div>
					<div
						v-for="(item, index) in shop.list"
						:key="index"
						class="cart-item">
						<div class="select">
							<div 
								@click="select(item)"
								:class="{'active-select-buttom': item.select}" 
								class="select-buttom">
								<van-icon color="#fff" name="success"></van-icon>
							</div>
						</div>
						<div class="goods-image">
							<van-image
								width="78"
								height="78"
								:src="item.goodsImg" />
						</div>
						<div class="goods-info">
							<div class="goods-name">{{item.name}}</div>
							<div class="goods-size">{{item.size}}</div>
							<div class="goods-price">¥{{item.price}}</div>
						</div>
						<div class="goods-stepper">
							<van-stepper v-model="item.num" input-width="40px" button-size="32px"></van-stepper>
						</div>
					</div>
				</div>
			</div>
		</base-scroll>
		
		<div class="submit-bar">
			<div @click="selectAll" class="select-all">
				<div
					:class="{'active-select-buttom': SelectAll}" 
					class="select-buttom">
					<van-icon color="#fff" name="success"></van-icon>
				</div>
			</div>
			<div class="button-text">全选</div>
			
			<div class="total">
				总计: <span>¥{{total}}</span>
			</div>
			<div class="submit-btn">结算({{selectGoods.length}})</div>
		</div>
	</div>
</template>

<script>
import { Image, Icon, Stepper } from 'vant'
const ERR_OK = 0
export default {
	components: {
		'van-image': Image,
		'van-icon': Icon,
		'van-stepper': Stepper,
	},
	computed: {
		SelectAll () {
			var goodsNum = 0
			this.cart.forEach(shop => {
				shop.list.forEach(() => {
					goodsNum += 1
				})
			})
			if (this.selectGoods.length == 0) return false
			if (this.selectGoods.length == goodsNum) {
				return true
			} else {
				return false
			}
		},
		total () {
			let res = 0.00
			if (this.selectGoods.length > 0) {
				this.selectGoods.forEach(item => {
					res += (item.price * item.num)
				})
			}
			res = parseFloat(res).toFixed(2)
			return res.toString()
		}
	},
	data () {
		return {
			scrollConfig: {
				click: true
			},
			cart: [],
			selectGoods: [],
			selectShop: []
		}
	},
	created () {
		this._getCartList()
	},
	methods: {
		_getCartList() {
			this.getRequest('/api/cart').then(res => {
				console.log(res)
				if (res.errCode === ERR_OK) {
					this.cart = res.data.list
					console.log()
				}
			})
		},
		_selectShop (shop_id, index) {
			//判断行为是选择还是取消
			let action = true
			if (this.selectShop.indexOf(index) !== -1) {
				action = false
			}
			
			this.selectGoods.forEach((item) => {
				if (item.shop_id == shop_id) {
					item.select = false
				}
			})
			let _selectGoods = [] //新的数组
			//清空特定商店的商品
			_selectGoods = this.selectGoods.filter((item) => {
				return item.shop_id !== shop_id
			})
			this.selectGoods = _selectGoods
			
			if (!action) {
				console.log(this.selectShop)
				this.selectShop.splice(this.selectShop.indexOf(index), 1)
				return
			} else {
				let shop_index = null
				for (let i = 0; i < this.cart.length; i++) {
					if (this.cart[i].shop_id == shop_id) {
						shop_index = i
					}
				}
				this.cart[shop_index].list.forEach((item) => {
					item.select = true
					this.selectGoods.push(item)
				})
				this.selectShop.push(index)
			}
			
			console.log(this.selectShop)
			console.log(this.selectGoods)
		},
		selectAll () {
			if (!this.SelectAll) {
				this.selectGoods = []
				this.cart.forEach((shop, index) => {
					this.selectShop.push(index)
					shop.list.forEach(item => {
						item.select = true
						this.selectGoods.push(item)
					})
				})
			} else {
				this.cart.forEach(shop => {
					shop.list.forEach(item => {
						item.select = false
					})
				})
				this.selectGoods = []
				this.selectShop = []
			}
		},
		select (item) {
			// 判断商品是否已经选择
			let action = true
			for (var i=0; i < this.selectGoods.length; i++) {
				if (this.selectGoods[i].id == item.id) {
					action = false
					break
				}
			}
			
			//执行选择或者取消选择操作
			if (action) {
				item.select = true
				this.selectGoods.push(item)
			} else {
				item.select = false
				this.selectGoods.splice(i, 1)
			}
			
			//每次执行选择商品的时候进行判断
			//该商品所属商店的是否已经全选
			let shop_id = item.shop_id
			let shop_index = null //商店在数据的索引
			let shop_good_num = 0
			for (let i = 0; i < this.cart.length; i++) {
				if (this.cart[i].shop_id == shop_id) {
					shop_index = i
					break
				}
			}	
			this.selectGoods.forEach((item) => {
				if (item.select == true && item.shop_id == shop_id) {
					shop_good_num += 1
				}
			})
			
			if (this.cart[shop_index].list.length == shop_good_num) {
				this.selectShop.push(shop_index)
			} else {
				//let s = this.selectShop.join('')
				if (this.selectShop.indexOf(shop_index) !== -1) {
					this.selectShop.splice(this.selectShop.indexOf(shop_index), 1)
				}
			}
			console.log(this.selectShop)
			//console.log(shop_good_num)
			//console.log(shop_index)
		}
	}
}
</script>

<style scoped lang="stylus">
@import "~@common/stylus/base.styl"
@import "~@common/stylus/theme-color.styl"

.shop {
	margin-bottom: 15px
	background: $background-color
	.shop-name {
		position: relative
		display: flex
		width: 95%
		margin: 0 auto
		text-align: left
		padding: 15px 0
		.select {
			width: 10%
			.select-buttom {
				box-sizing: border-box
				padding: 2px
				margin: 0 auto
				height: 20px
				width: 20px
				border-radius: 50%
				box-shadow: 0 0 1.5px black
				background: #FFFFFF
			}
			.active-select-buttom {
				background: $blue-color
			}
		}
		.name {
			margin-left: 5px
			.icon {
				margin-left: 10px
				height: 16px
				transform: translateY(2px)
			}
		}
		&:after {
			content: ""
			position: absolute
			bottom: 0
			left: -2.5%
			right: -2.5%
			border-bottom: 1px solid #eaeaea
		}
	}
}
.cart-list {
	width: 100%
	height: calc(100% - 94px)
	overflow: hidden
	background: #FFFFFF
	.cart-list-container {
		padding: 15px 0
	}
	.cart-item {
		box-sizing: border-box
		display: flex
		position: relative
		padding: 10px 2.5%
		height: 98px
		background: $background-color
		.select {
			width: 10%
			.select-buttom {
				box-sizing: border-box
				padding: 2px
				margin: 27.5px auto
				height: 20px
				width: 20px
				border-radius: 50%
				box-shadow: 0 0 1.5px black
				background: #FFFFFF
			}
			.active-select-buttom {
				background: $blue-color
			}
		}
		.goods-image {
			text-align: left
			width: 25%
			height: 75px
		}
		.goods-info {
			position: relative
			width: 65%
			text-align: left
			.goods-name {
				font-size: 14px
				font-weight: 500
				line-height: 18px
				overflow: hidden
				text-overflow: ellipsis
				white-space: nowrap
			}
			.goods-size {
				color: $font-tips-color
				font-size: 14px
				overflow: hidden
				width: 55%
			}
			.goods-price {
				position: absolute
				bottom: 0
				line-height: 16px
				color: $theme-color
				font-weight: 500
			}
		}
		.goods-stepper {
			position: absolute
			bottom: 10px
			right: 2.5%
		}
	}
}
.submit-bar {
	position: absolute
	bottom: 0
	height: 50px
	width: 100%
	background: #FFFFFF
	display: flex
	.select-all {
		width: 10%
		.select-buttom {
			box-sizing: border-box
			padding: 2px
			margin: 15px auto
			height: 20px
			width: 20px
			border-radius: 50%
			box-shadow: 0 0 1.5px black
			background: #FFFFFF
		}
		.active-select-buttom {
			background: $blue-color
		}
	}
	.button-text {
		line-height: 50px
		width: 10%
		font-size: 14px
	}
	.submit-btn {
		position: absolute
		top: 0
		bottom: 0
		right: 0
		width: 35%
		font-size: 18px
		font-weight: 500
		line-height: 50px
		color: $white-color
		background: $theme-color
	}
	.total {
		box-sizing: border-box
		position: absolute
		top: 0
		bottom: 0
		right: 35%
		width: 40%
		text-align: right
		line-height: 50px
		padding-right: 10px
		font-size: 14px
		span {
			color: $theme-color
			font-size: 16px
			font-weight: 700
		}
	}
}
</style>
