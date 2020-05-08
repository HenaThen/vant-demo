<template>
	<header class="base-header">
		<div @click="leftClick" class="left">
			<slot name="left">
				<img src="../../assets/icon/back.png">
			</slot>
		</div>
		<div class="title van-ellipsis">{{title}}</div>
		<div @click="rightClick" class="right">
			<slot name="right"></slot>
		</div>
	</header>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: '页面标题'
		}
	},
	methods: {
		leftClick () {
			this.$emit('click-left', true)
		},
		rightClick () {
			this.$emit('click-right', true)
		}
	}
}
</script>

<style scoped lang="stylus">
@import "~@common/stylus/mixin.styl"
@import "~@common/stylus/theme-color.styl"
.base-header {
	box-sizing: border-box
	padding: 0 2.5%
	width: 100%
	height: 44px
	line-height: 44px
	display: flex
	font-size: 16px !important
	background-color: $theme-color
	color: $white-color
	.title {
		width: 75%
		text-align: center
		font-weight: 500
		letter-spacing: 0.5px
		no-wrap()
	}
	.right {
		width: 12.5%
		text-align: right
	}
	.left {
		text-align: left
		width: 12.5%
		img {
			height: 24px
			width: 24px
			margin: 10px auto
		}
	}
}
</style>
