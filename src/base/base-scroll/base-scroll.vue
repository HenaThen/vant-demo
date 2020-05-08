<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
	props: {
		// 滚动类型
		probeType: {
			type: Number,
			default: 1
		},
		// 滚动监听
		listenScroll: {
			
		},
		// 内容区点击
		click: {
			type: Boolean,
			default: true
		}
	},
	mounted () {
		setTimeout( () => {
			this._initScroll()
		}, 20)
	},
	methods: {
		_initScroll () {
			if (!this.$refs.wrapper) {
				return
			}
			this.scroll = new BScroll(this.$refs.wrapper, {
				probeType: this.probeType,
				click: this.click
			})
			
			if (this.listenScroll) {
				this.scroll.on('scroll', (pos) => {
					this.$emit('scroll', pos)
				})
			}
		}
	}
}
</script>

<style>
</style>
