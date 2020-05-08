<template>
	<div class="container">
		<div class="person-pic-box">
			<div class="person-pic"></div>
			<div class="person-nickname">快走开你萌到我辣</div>
		</div>
		
		<div class="menu">
			<div 
				v-for="(item, index) in menu"
				:key="index"
				@click="jump(item.target)"
				class="menu-item">
				<div class="icon" :style="{'background-image': 'url('+ item.icon+ ')'}"></div>
				<span class="title">{{item.title}}</span>				
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			menu: [
				{title: '购物车', icon: require('../../assets/icon/cart.png'), target: '/shop/cart'},
				{title: '待付款', icon: require('../../assets/icon/payment.png'), target: '/shop/cart'},
				{title: '待发货', icon: require('../../assets/icon/deliver.png'), target: '/shop/cart'},
				{title: '已发货', icon: require('../../assets/icon/receive.png'), target: '/shop/cart'}
			]
		}
	},
	methods: {
		jump (target) {
			this.$router.push({
				path: target
			})
		}
	}
}
</script>

<style scoped lang="stylus">
@import "~@common/stylus/base.styl"
@import "~@common/stylus/mixin.styl"
@import "~@common/stylus/theme-color.styl"
.person-pic-box {
	position: relative
	width: 100%
	height: 30%
	background: rgba(0, 0, 0 .3)
	&:before {
		content: ""
		position: absolute
		z-index: -2
		fill-all()
		background-image: url('../../assets/person/1.jpg')
		background-size: cover
		background-position: 25%
	}
	.person-pic {
		display: inline-block
		margin-top: 80px
		width: 75px
		height: 75px
		border-radius: 50%
		background-image: url('../../assets/person/1.jpg')
		background-size: cover
	}
	.person-nickname {
		font-weight: 500
		color: rgba(255,255,255, .6)
	}
}
.menu {
	width: 100%
	display: flex
	background: #FFFFFF
	.menu-item {
		margin: 15px auto
		width: 25%
		font-size: 14px
		color: #888888
		font-weight: 400
		.title {
			transform: translateY(-10px)
		}
		.icon {
			margin: 0 auto
			width: 40px
			height: 25px
			background-size: 60%
			background-position: 50%
			background-repeat: no-repeat
		}
	}
}
</style>
