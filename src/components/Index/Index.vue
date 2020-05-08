<template>
  <div class="container">
	<base-header @rightClick="test">
	</base-header>
	
	<div class="button">
	</div>
  </div>
</template>

<script>
export default {
	data () {
		return {
		}
	},
	mounted () {
		this.test()
	},
	methods: {
		test () {
			var a = [1, 3, 5, 7, 9]
			let map = a.map((item) => {
				return item + 1
			})
			console.log(map)
		},
	}
}
</script>

<style scoped lang="stylus">
@import "~@common/stylus/base.styl"
.show-box {
	width: 120px
	height: 120px
	canvas {
		width: 100%
		height: 100%
	}
}
</style>
