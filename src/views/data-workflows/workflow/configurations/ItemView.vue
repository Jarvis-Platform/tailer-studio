<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<item-component :tabs-items="itemTabsItems" :is-loading="isLoading" />
	</div>
</template>

<script>
import TabsItemsMixin from '../tabs-items';
import ItemMixin from '@/mixins/data-workflows/item-mixin';

export default {
	name: 'workflow-configurations-item-view',
	mixins: [TabsItemsMixin, ItemMixin],
	data() {
		return {
			moduleName: 'workflowConfs'
		};
	},
	computed: {
		itemTabsItems() {
			return [
				{
					label: 'Configuration',
					href: 'configuration',
					component: {
						name: 'overview-component',
						props: {
							data: this.configurationData
						}
					}
				},
				{
					label: 'Full Json',
					href: 'full-json',
					component: {
						name: 'view-json',
						props: {
							json: this.item,
							jsonId: this.itemId
						}
					}
				},
				{
					label: 'Conversation',
					href: 'conversation',
					component: {
						name: 'view-conversation',
						props: {}
					}
				}
			];
		},
		configurationData() {
			if (!this.item) return;

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						collection: this.moduleName,
						activeHeader: true,
						viewId: this.item.id,
						viewType: 'conf',
						description: this.item.short_description
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Workflow configuration',
						paramItems: [
							{
								id: 'account',
								label: 'Account',
								value: this.item.account
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.item.environment
							}
						]
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Target Job',
						description: 'Job to target',
						columns: [
							{
								label: 'Job ID',
								field: 'job_id'
							}
						],
						rows: [{ job_id: this.item.target_dag }],
						lineNumbers: true,
						searchOptionsEnabled: false
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Triggering Jobs',
						description: 'Jobs trigerring the workflow',
						columns: [
							{
								label: 'Job ID',
								field: 'job_id'
							}
						],
						rows: this.item.authorized_job_ids.map(function(val, index) {
							return { job_id: val };
						}),
						lineNumbers: true,
						searchOptionsEnabled: true
					}
				}
			];
		}
	}
};
</script>