<template>
	<div>
		<TopBar/>
		<div class="container">
			<div class="waterfull">
				<div class="v-waterfall-content" id="v-waterfall">
					<div v-for="(img, index) in waterfallList" :key="index" class="v-waterfall-item" :style="{top:img.top+'px',left:img.left+'px',width:waterfallImgWidth+'px',height:img.height}">
						<img :src="img.src" alt="">
						<p style="font-size: small;color: #666;margin: 4px;">{{img.title}}</p>
						<p style="font-size: x-small;color: #9e9e9e;margin: 4px;padding-bottom: 6px;">{{img.info}}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import TopBar from "@/components/content/topbar/TopBar";
	export default {
		name: "CampusScenery",
		components:{
			TopBar,
		},
		data() {
			return {
				waterfallList: [],
				imgArr: [
					'https://q0.itc.cn/q_70/images03/20240301/0ea7bfb96f1b4fc390357d8b1bb2bf6b.jpeg',
					'https://img1.baidu.com/it/u=3365847383,891312786&fm=253&fmt=auto&app=138&f=JPEG?w=688&h=500',
					'https://img2.baidu.com/it/u=1059896452,2530941322&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F6d0d2cac-d592-460a-be4b-d61dcce098ae%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1722164537&t=75f9d73a64222d066d6e617e93168376',
					'https://img0.baidu.com/it/u=1835422488,2846807416&fm=253&fmt=auto&app=138&f=JPEG?w=810&h=500',
					'https://img1.baidu.com/it/u=218348307,3255064057&fm=253&fmt=auto&app=138&f=JPEG?w=666&h=500',
					'https://img1.baidu.com/it/u=3011583188,1260222273&fm=253&fmt=auto&app=138&f=JPEG?w=734&h=500',
					'https://img1.baidu.com/it/u=280085351,2358130613&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
					'https://img2.baidu.com/it/u=936767185,3542297683&fm=253&fmt=auto&app=138&f=JPEG?w=863&h=500',
					'https://img2.baidu.com/it/u=3613831550,3205576539&fm=253&fmt=auto&app=138&f=JPEG?w=668&h=500',
					'https://img1.baidu.com/it/u=771166228,2070652271&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
					'https://img1.baidu.com/it/u=3218124993,2683462904&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
					'https://img2.baidu.com/it/u=2473420495,2092816616&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=282',
					'https://img2.baidu.com/it/u=1060221130,2174469521&fm=253&fmt=auto&app=138&f=JPG?w=752&h=500',
					'https://img2.baidu.com/it/u=3107069431,2162327381&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=425',
					'https://img0.baidu.com/it/u=1823563923,1485277535&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500',
					'https://www.zjitc.net/images/_thumb/b425c726-7e48-44f0-a973-5fcaae737187.jpg',
					'https://www.zjitc.net/images/_thumb/9688ca96-f617-4a66-9b03-e5e34b4497bb.jpg',
					'https://www.zjitc.net/images/15/11/25/1jmkyh1bsw/_thumb/IMG_487.jpg',
					'https://www.zjitc.net/images/15/11/25/1jmkyh1bsw/_thumb/IMG_492.jpg',
					'https://www.zjitc.net/images/15/11/25/17x953zbzb/_thumb/DSC_00110.jpg',
					'https://www.zjitc.net/images/15/11/25/1jmkyh1bsw/_thumb/DSC_0064_2.jpg',
					'https://www.zjitc.net/images/15/11/25/1jmkyh1bsw/_thumb/DSC_0009.jpg',
					'https://www.zjitc.net/images/15/11/25/1jmkyh1bsw/_thumb/DSC_0029.jpg',
					'https://www.zjitc.net/images/15/11/25/1jmkyh1bsw/_thumb/DSC_0747.jpg',
					'https://www.zjitc.net/images/15/11/25/1jmkyh1bsw/_thumb/DSC_0074.jpg'
				],
				waterfallImgWidth: 200,
				waterfallImgCol: 5,
				waterfallImgRight: 10,
				waterfallImgBottom: 10,
				waterfallDeviationHeight: [],
				imgList: []
			}
		},
		created() {
			for (let i = 0; i < this.imgArr.length; i++) {
				this.imgList.push(this.imgArr[i]);	
			}
		},
		mounted() {
			this.calculationWidth();
		},
		methods: {
			calculationWidth() {
				let domWidth = document.getElementById("v-waterfall").offsetWidth;
				if (!this.waterfallImgWidth && this.waterfallImgCol) {
					this.waterfallImgWidth = (domWidth - this.waterfallImgRight * this.waterfallImgCol) / this.waterfallImgCol;
				} else if (this.waterfallImgWidth && !this.waterfallImgCol) {
					this.waterfallImgCol = Math.floor(domWidth / (this.waterfallImgWidth + this.waterfallImgRight))
				}
				this.waterfallDeviationHeight = new Array(this.waterfallImgCol);
				for (let i = 0; i < this.waterfallDeviationHeight.length; i++) {
					this.waterfallDeviationHeight[i] = 0;
				}
				this.imgPreloading()
			},
			imgPreloading() {
				for (let i = 0; i < this.imgList.length; i++) {
					let aImg = new Image();
					aImg.src = this.imgList[i];
					aImg.onload = aImg.onerror = (e) => {
						let imgData = {};
						imgData.height = this.waterfallImgWidth / aImg.width * aImg.height;
						imgData.src = this.imgList[i];
						imgData.title = 'leo';
						imgData.info = '张老师安康';
						this.waterfallList.push(imgData);
						this.rankImg(imgData);
					}
				}
			},
			rankImg(imgData) {
				let {
					waterfallImgWidth,
					waterfallImgRight,
					waterfallImgBottom,
					waterfallDeviationHeight,
				} = this;
				let minIndex = this.filterMin();
				imgData.top = waterfallDeviationHeight[minIndex];
				imgData.left = minIndex * (waterfallImgRight + waterfallImgWidth);
				waterfallDeviationHeight[minIndex] += imgData.height + waterfallImgBottom + 56;
				console.log(imgData);
			},
			filterMin() {
				const min = Math.min.apply(null, this.waterfallDeviationHeight);
				return this.waterfallDeviationHeight.indexOf(min);
			}
		}
	}
</script>

<style scoped>
	.container {
		display: flex;
		justify-content: center;
		background-color: #daf0ff;
		padding-top: 10px;
		min-height: calc( 100vh - 48px );
	}
	.waterfull{
		width: 1070px;
		text-align: center;

	}
	.v-waterfall-content {
		width: 100%;
		height: 600px;
		position: relative;
		overflow-y: auto;
		background-color: #fff;
		border-radius: 10px;
	}

	.v-waterfall-item {
		float: left;
		position: absolute;

		background-color: #fff;
	}

	.v-waterfall-item img {
		width: 100%;
		height: auto;
		border-radius: 6px;
	}
</style>

