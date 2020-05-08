<template>
	<div class="container">
		<van-swipe class="goods-pic-swipe" @change="swipeChange">
			<van-swipe-item v-for="(item, index) in goods.info.goodsImg" :key="index" class="goods-pic-swipe-item">
				<van-image :src="item" fit="contain"></van-image>
			</van-swipe-item>
			<div class="custom-indicator" slot="indicator">
				{{ current + 1 }}/{{goods.info.goodsImg.length}}
			</div>
		</van-swipe>
	</div>
</template>

<script>
import { Swipe, SwipeItem, Image } from 'vant'
const ERR_OK = 0
export default {
	components: {
		'van-image': Image,
		'van-swipe': Swipe,
		'van-swipe-item': SwipeItem
	},
	data () {
		return {
			goods: [],
			current: 0
		}
	},
	mounted () {
		this._getCartList ()
	},
	methods: {
		swipeChange (index) {
			this.current = index
		},
		_getCartList() {
			const params = {
			}
			this.getRequest('/api/goods', params).then(res => {
				console.log(res)
				if (res.errCode === ERR_OK) {
					this.goods = res.data.goods
					console.log(this.goods)
				}
			})
		},
	}
}
</script>

<style scoped lang="stylus">
@import "~@common/stylus/base.styl"
@import "~@common/stylus/theme-color.styl"
.container {
	.goods-pic-swipe {
		position: relative
		.goods-pic-swipe-item {
			width: 100%
			height: 320px !important
		}
		.custom-indicator {
			position: absolute
			bottom: 20px
			right: 20px
			z-index: 999
			font-weight: 700
			background: rgba(0, 0, 0, .7)
			color: rgba(255, 255, 255, .8)
			height: 30px
			line-height: 30px
			padding: 0 18px
			border-radius: 3px
		}
	}
}
</style>
