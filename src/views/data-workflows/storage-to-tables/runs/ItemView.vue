<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<runs-item :tabs-items="itemTabsItems" :is-loading="isLoading" />
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/data-workflows/common/DataManagementHeader';
import RunsItem from '@/components/data-workflows/common/item/ItemComponent';

import TabsItemsMixin from '../tabs-items';
import ItemMixin from '@/mixins/data-workflows/item-mixin';

export default {
	name: 'storage-to-tables-run-view',
	components: { DataManagementHeader, RunsItem },
	mixins: [TabsItemsMixin, ItemMixin],
	data: () => ({
		item: null,
		moduleName: 'storageToTablesRuns'
	}),
	methods: {
		getDestinationTables() {
			return this.item.configuration_context.destinations[0].tables;
		},
		getDestinations() {
			return [
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Destination',
						tooltip: true,
						description: 'Tables where the files have to be loaded',
						paramItems: [
							{
								id: 'type',
								label: 'Destination Type',
								value: this.item.configuration_context.destinations[0].type,
								default: 'None'
							},
							{
								id: 'gcp_project_id',
								label: 'Project ID',
								value: this.item.configuration_context.destinations[0].gcp_project_id,
								default: 'None'
							},
							{
								id: 'gbq_dataset',
								label: 'Dataset',
								value: this.item.configuration_context.destinations[0].gbq_dataset,
								default: 'None'
							}
						]
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Tables',
						description: 'Tables List to be loaded from files',
						columns: [
							{
								label: 'Table Name',
								field: 'table_name',
								width: '200px'
							},
							{
								label: 'Filename Template',
								field: 'filename_template',
								width: '200px'
							},
							{
								label: 'Description',
								field: 'short_description',
								width: '300px'
							}
						],
						rows: this.getDestinationTables(),
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: true
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Default Parameters',
						tooltip: true,
						description: 'Default Paramters for Jobs loading files to tables',
						paramItems: [
							{
								id: 'source_format',
								label: 'Source Format',
								value: this.item.configuration_context.destinations[0].source_format,
								default: 'CSV',
								description:
									'Default source format for input files. Only "CSV" or "JSON" are supported. Default : "CSV"'
							},
							{
								id: 'create_disposition',
								label: 'Creation Disposition',
								value: this.item.configuration_context.destinations[0].create_disposition,
								default: 'CREATE_IF_NEEDED'
							},
							{
								id: 'write_disposition',
								label: 'Write Disposition',
								value: this.item.configuration_context.destinations[0].write_disposition,
								default: 'WRITE_TRUNCATE'
							},
							{
								id: 'skip_leading_rows',
								label: 'Skip Leading Rows',
								value: this.item.configuration_context.destinations[0].skip_leading_rows,
								default: '1'
							},
							{
								id: 'field_delimiter',
								label: 'Field Delimiter',
								value: this.item.configuration_context.destinations[0].field_delimiter,
								default: '|'
							},
							{
								id: 'quote_character',
								label: 'Quote Character',
								value: this.item.configuration_context.destinations[0].quote_character,
								default: ''
							},
							{
								id: 'null_marker',
								label: 'Null Marker',
								value: this.item.configuration_context.destinations[0].null_marker,
								default: ''
							},
							{
								id: 'bq_load_job_ignore_unknown_values',
								label: 'Ignore Unknown Values',
								value: this.item.configuration_context.destinations[0].bq_load_job_ignore_unknown_values,
								default: 'false'
							},
							{
								id: 'bq_load_job_max_bad_records',
								label: 'Max Bad Records',
								value: this.item.configuration_context.destinations[0].bq_load_job_max_bad_records,
								default: '0'
							},
							{
								id: 'bq_load_job_schema_update_options',
								label: 'Schema Update Options',
								value: this.item.configuration_context.destinations[0].bq_load_job_schema_update_options,
								default: '[]'
							},
							{
								id: 'bq_load_job_allow_quoted_newlines',
								label: 'Allow Quoted New Lines',
								value: this.item.configuration_context.destinations[0].bq_load_job_allow_quoted_newlines,
								default: 'false'
							},
							{
								id: 'bq_load_job_allow_jagged_rows',
								label: 'Allow Jagged Rows',
								value: this.item.configuration_context.destinations[0].bq_load_job_allow_jagged_rows,
								default: 'false'
							}
						]
					}
				}
			];
		}
	},
	computed: {
		itemTabsItems() {
			return [
				{
					label: 'Run Details',
					href: 'run-details',
					component: {
						name: 'overview-component',
						props: {
							data: this.runDetailsData
						}
					}
				},
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
		runDetailsData() {
			if (!this.item) return;

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						activeHeader: true,
						viewId: this.item.triggering_file,
						viewType: 'run',
						description: null,
						runStatus: this.item.status
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Table to Storage Run',
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
					component: 'parameters-list',
					props: {
						groupTitle: 'Main parameters',
						tooltip: true,
						description: 'Main parameters of the Table to Storage Run',
						paramItems: [
							{
								id: 'configuration_id',
								label: 'Configuration Id',
								value: this.item.configuration_id
							},
							{
								id: 'triggering_file',
								label: 'Triggering File',
								value: this.item.triggering_file
							},
							{
								id: 'matching_filename_template',
								label: 'Matching Filename Template',
								value: this.item.matching_filename_template
							},
							{
								id: 'source_storage',
								label: 'Source Storage',
								value: this.item.source_storage
							}
						]
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Run Details',
						tooltip: true,
						description: 'Details of the Table to Storage Run',
						paramItems: [
							{
								id: 'dag_type',
								label: 'Dag Type',
								value: this.item.dag_type
							},
							{
								id: 'job_id',
								label: 'Job Id',
								value: this.item.job_id
							},
							{
								id: 'dag_execution_date',
								label: 'Execution Date',
								value: this.item.dag_execution_date
							},
							{
								id: 'dag_run_id',
								label: 'Dag Run Id',
								value: this.item.dag_run_id
							},
							{
								id: 'dag_generator_version',
								label: 'Dag Generator Version',
								value: this.item.dag_generator_version
							}
						]
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
						activeHeader: false,
						viewId: this.item.configuration_id,
						viewType: 'conf',
						description: null,
						runStatus: this.item.status
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Table to Storage configuration',
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
						tableTitle: 'Source Storage',
						description: 'Source Storage of the files to load',
						columns: [
							{
								label: 'Type',
								field: 'source_type',
								width: '100px'
							},
							{
								label: 'Storage ID',
								field: 'gcs_source_bucket',
								width: '200px'
							},
							{
								label: 'Destination Folder',
								field: 'gcs_source_prefix',
								width: '200px'
							},
							{
								label: 'Archive Folder',
								field: 'gcs_archive_prefix',
								width: '200px'
							}
						],
						rows: [
							{
								source_type: this.item.configuration_context.source.type,
								gcs_source_bucket: this.item.configuration_context.source.gcs_source_bucket,
								gcs_source_prefix: this.item.configuration_context.source.gcs_source_prefix,
								gcs_archive_prefix: this.item.configuration_context.source.gcs_archive_prefix
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: 'false'
					}
				},
				...this.getDestinations(),
				{
					component: 'create-update-conf-overview',
					props: {
						creationDate: this.item.configuration_context.creation_date,
						updateDate: this.item.configuration_context.update_date,
						createdBy: this.item.configuration_context.created_by,
						updatedBy: this.item.configuration_context.updated_by
					}
				}
			];
		}
	}
};
</script>