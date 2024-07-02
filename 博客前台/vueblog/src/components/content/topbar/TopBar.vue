<template>
	<div id="csdn-toolbar">
		<div class="toolbar-inside">
			<div class="toolbar-container">
				<div class="toolbar-container-left">
					<div class="toolbar-logo toolbar-subMenu-box csdn-toolbar-fl">
						<a
							data-report-click='{"spm":"3001.4476"}'
							data-report-query="spm=3001.4476"
							href="/"
						>
							<img id="icon" title="首页" src="../../../assets/img/long-logo.png"/>
						</a>
					</div>
					<ul id="head-nav" class="toolbar-menus csdn-toolbar-fl">
						<li class="" title="技术问题，有问必答">
							<a
								data-report-click='{"mod":"popu_336","dest":"http://scblogs.cn/","spm":"3001.4492"}'
								data-report-query="spm=3001.4492"
								href="/"
							>
								问答
							</a>
						</li>

						<li class="" title="找到志同道合的伙伴">
							<a
								@click="ToHeart()"
								href="javascript:"
							>
								动态
							</a>
						</li>

						<li class="" title="看看美丽的校园">
							<a
								data-report-click='{"mod":"popu_336","dest":"http://scblogs.cn/","spm":"3001.4482"}'
								data-report-query="spm=3001.4482"
								href="/#/campus/scenery"
							>
								校园风采
							</a>
						</li>

						<li class="" title="当前院校">
							<a
								href="javascript:"
								@click="centerDialogVisible = true">
								<el-popover
									placement="top"
									width="500"
									v-model="visible"
									:key="showschool"
								>
									<el-row>
										<el-col :span="8">
											<el-select
												v-model="provinceId"
												@focus="getProvinces"
												placeholder="请选择省份"
											>
												<el-option
													v-for="item in provinceList"
													:key="item.id"
													:label="item.name"
													:value="item.id"
												>
												</el-option>
											</el-select>
										</el-col>
										<el-col :span="8">
											<el-select
												v-model="cityId"
												@focus="getCities"
												placeholder="请选择城市"
											>
												<el-option
													v-for="item in cityList"
													:key="item.id"
													:label="item.name"
													:value="item.id"
												>
												</el-option>
											</el-select>
										</el-col>
										<el-col :span="8">
											<el-select
												v-model="schoolCode"
												@focus="getSchools"
												placeholder="请选择学校"
											>
												<el-option
													v-for="item in schoolList"
													:key="item.id"
													:label="item.name"
													:value="item.code"
												>
												</el-option>
											</el-select>
										</el-col>
									</el-row>
									<div style="text-align: right; margin: 10px">
										<el-button size="mini" type="text" @click="Cancel()">取消</el-button>
										<el-button type="primary" size="mini" @click="ChangeSchool()">确定</el-button>
									</div>
									<el-text slot="reference">{{this.myschool}}</el-text>
								</el-popover>
							</a>
						</li>

					</ul>
				</div>

				<div class="toolbar-container-middle" :style="{'display': isShowInput}">
					<div class="toolbar-search onlySearch">
						<div class="toolbar-search-container">
							<span class="icon-fire" style="display: none"></span>
							<input
								id="toolbar-search-input"
								autocomplete="off"
								type="text"
								v-model="key"
								value=""
								placeholder="迁移学习分析"
								style="text-indent: 12px"
							/>
							<button id="toolbar-search-button" @click="goSearchBlogs()">
								<i></i><span>搜索</span>
							</button>
							<input
								type="password"
								autocomplete="new-password"
								readonly=""
								disabled="true"
								style="
                  display: none;
                  position: absolute;
                  left: -9999999px;
                  width: 0;
                  height: 0;
                "
							/>
						</div>
					</div>
				</div>
			<a href="http://localhost:5173/#/" target="_blank">
				<div style="    display: block;
   					min-width: 105px;
  					height: 32px;
    				line-height: 32px;
    				text-align: center;
    				color: #fff;
    				background-color: #16a0f8;
    				border-radius: 5px;
    				margin-top: calc((48px - 32px)/ 2);
					margin-right: 20px;">
					<span>
						博客后台
					</span>
				</div>
			</a>

				<div class="toolbar-container-right">
					<div class="toolbar-btns onlyUser">
						<div
							class="toolbar-btn toolbar-btn-login csdn-toolbar-fl"
							v-if="!isShowAvatar"
						>
							<router-link to="/login"><a>登录/注册</a></router-link>
						</div>
						<div class="test-div csdn-toolbar-fl">
							<el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  <a class="test-div csdn-toolbar-fl" v-if="isShowAvatar">
                    <img :src="avatarUrl" alt="" class="test-img"
												 style="border: 1px solid #e8e8ed;margin-right: 10px;"/>
                  </a>
                </span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item command="a">个人中心</el-dropdown-item>
									<el-dropdown-item command="b" divided
									>退出登录
									</el-dropdown-item
									>
								</el-dropdown-menu>
							</el-dropdown>
						</div>
						<div class="toolbar-btn toolbar-btn-write csdn-toolbar-fl">
							<a
								data-report-click='{"spm":"3001.7765"}'
								data-report-query="spm=3001.7765"
								class="btn-write-new"
								@click="goBlogEdit()"
								style="cursor: pointer"
							></a>
						</div>


					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TopBar",
	data() {
		return {
			userMessage: {},
			avatarUrl: require("../../../assets/img/home/default_avatar.jpg"),
			isShowAvatar: false,
			key: "",
			isShowInput: "block",
			path: this.$route.fullPath,
			showschool: 0,
			currentSchool: '',
			myschool: "浙江工贸职业技术学校",
			visible: false,
			provinceId: "", 
			provinceList: [],
			schoolList: [],
			schoolCode: "",
			cityId: "",
			cityList: [],
			config: {
				headers: {
					token: localStorage.getItem('token')
				}
			}
		};
	},

	components: {},
	created() {
		this.avatarUrl = window.localStorage.avatarUrl;
		this.isShowAvatar = window.localStorage.isShowAvatar;
		console.log(this.$route.fullPath)
		this.showInput();
	},
	mounted() {
		this.bus.$on("userMessage", (data) => {
			this.avatarUrl = JSON.parse(data).avatarUrl;
			this.isShowAvatar = true;
			this.userMessage = data;
			window.localStorage.avatarUrl = this.avatarUrl;
			window.localStorage.isShowAvatar = this.isShowAvatar;
			window.localStorage.userMessage = this.userMessage;
		});
	},
	methods: {
		Cancel() {
			this.visible = !this.visible
			this.provinceId = ''
			this.cityId = ''
			this.schoolCode = ''
		},
		GetMySchool() {
			this.myschool = JSON.parse(localStorage.getItem('userMessage')).schoolName
		},
	ChangeSchool() {
    let formdata = new FormData()
    formdata.append('code', this.schoolCode)
    this.$axios.put('/user/school/code', formdata, this.config).then(res => {
        if (res.data.status !== 'success') {
            this.visible = false
            this.$message.success('学校信息更新成功！')
			this.schoolList = res.data.schoolList;
			this.currentSchool = this.schoolCode;
			console.log(this.schoolName)
        } else {
            this.$message.error('学校信息更新失败，请稍后重试！')
        }
    }).catch(error => {
        this.$message.error('服务器错误，请稍后重试！')
    })
},
		getProvinces() {
			this.$axios.get("/resource/province").then((res) => {
				this.provinceList = res.data.data;
				console.log("返回的省份数据", this.provinceList, "选中的省份id", this.provinceId)
			});

		},
		getCities() {
			if (this.provinceId === '') {
				this.$message({
					showClose: true,
					message: "请先选取省份",
					type: "warning",
				});
			} else {
				this.$axios
					.get("/resource/city?provinceId=" + this.provinceId)
					.then((res) => {
						this.cityList = res.data.data;
					});
			}
		},
		getSchools() {
			if (this.cityId === '') {
				this.$message({
					showClose: true,
					message: "请先选取城市",
					type: "warning",
				});
			} else {
				this.$axios
					.get("/resource/university?cityId=" + this.cityId)
					.then((res) => {
						this.schoolList = res.data.data;
					});
			}
		},

		showInput() {
			if (this.path === '/blog/search') {
				this.isShowInput = "none";
			} else {
				this.isShowInput = "block";
			}
		},

		ToHeart() {
			this.$router.push('/HeartSay')
		},

		goSearchBlogs() {
			this.$store.commit('copySearchKey', this.key)
			this.$router.push('/blog/search')
		},

		handleCommand(command) {
			if (command === "a") {
				var routeUrl = this.$router.resolve({
					name: 'UserHome',
					params: {userId: JSON.parse(localStorage.getItem("userMessage")).id}
				})
				window.open(routeUrl.href, '_blank');
			}
			if (command === "b") {
				console.log("退出登录");
				this.$message({
					showClose: true,
					message: "已退出登录",
					type: "success",
				});

				window.localStorage.clear();
				window.sessionStorage.clear();

				window.location.reload();
			}
		},

		goBlogEdit() {

			if (window.localStorage.isShowAvatar === undefined) {
				this.$message({
					showClose: true,
					message: "请先登录哦~",
					type: "warning",
				});
			} else {
				this.$router.push({path: "/blog/add"});

			}
		},
	},
};
</script>

<style>
@import "../../../assets/css/content/topbar/topbar.css";

.test-div {
	height: 48px;
}

#csdn-toolbar {

	top: 0px;
	left: 0px;
	z-index: 100;
	width: 100%;
}

#csdn-toolbar
.toolbar-inside
.toolbar-container
.toolbar-container-right
.onlyUser
.test-img {
	display: block;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	margin-top: 8px;
}

.el-dropdown-link {
	cursor: pointer;
}

#icon {
	display: inline-block;
	wdith: 100px;
	height: 30px;
	margin-top: 5px;
}

#head-nav {

}
</style>
