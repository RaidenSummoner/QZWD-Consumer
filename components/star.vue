<template>
	<view class="star-rating">
		<span v-for="(star, index) in stars" :class="starClass(index)" @click="toggle(index)">
		      &#9733;
		    </span>
	</view>
</template>

<script>
	export default {
		name:"star",
		 data() {
		    return {
		      stars: [false]
		    }
		  },
		  methods: {
		    starClass(index) {
		      return {
		        "filled": this.stars[index],
		        "unfilled": !this.stars[index]
		      };
		    },
		    toggle(index) {
		      this.stars[index] = !this.stars[index];
		    }
		  }
		}
</script>

<style>
.star-rating {
	height: 20px;
	width:20px ;
  display: inline-block;
}
.filled {
  color: gold;
}
.unfilled {
  color: gray;
}
</style>