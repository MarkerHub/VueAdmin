<template>
	<el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
		<el-tab-pane
				v-for="(item, index) in editableTabs"
				:key="item.name"
				:label="item.title"
				:name="item.name"
		>

		</el-tab-pane>
	</el-tabs>
</template>

<script>
	export default {
		name: "Tabs",
		data() {
			return {
				// editableTabsValue: this.$store.state.menus.editableTabsValue,
				// editableTabs: this.$store.state.menus.editableTabs
			}
		},
		computed: {
			editableTabs: {
				get() {
					return this.$store.state.menus.editableTabs
				},
				set(val) {
					this.$store.state.menus.editableTabs = val
				}
			},
			editableTabsValue: {
				get() {
					return this.$store.state.menus.editableTabsValue
				},
				set(val) {
					this.$store.state.menus.editableTabsValue = val
				}
			}
		},
		methods: {

			removeTab(targetName) {
				let tabs = this.editableTabs;
				let activeName = this.editableTabsValue;

				if (activeName === 'Index') {
					return
				}

				if (activeName === targetName) {
					tabs.forEach((tab, index) => {
						if (tab.name === targetName) {
							let nextTab = tabs[index + 1] || tabs[index - 1];
							if (nextTab) {
								activeName = nextTab.name;
							}
						}
					});
				}

				this.editableTabsValue = activeName;
				this.editableTabs = tabs.filter(tab => tab.name !== targetName);

				this.$router.push({name: activeName})

			},
			clickTab (target) {
				this.$router.push({name: target.name})
			}
		}
	}
</script>

<style scoped>

</style>