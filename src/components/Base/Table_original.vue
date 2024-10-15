<template>
<div class="q-pa-md">
    <!-- {{tta_list}} -->
    <q-table title="TTA" :rows="tta_list" :columns="columns" row-key="name">
        <template v-slot:top-right>
            <!-- <q-input borderless dense debounce="300"  placeholder="Search">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input> -->

            <!-- <q-btn icon="add" color="primary" dense outline class="float-right q-ma-sm" @click="addRecordClick"></q-btn> -->
        </template>

        <template v-slot:body-cell-action="props">
            <q-td>
                <q-btn icon="edit_note" color="primary" dense outline ripple class="q-mr-sm" @click="testEditRecordClick(props.row)">
                    <q-tooltip>
                        Edit
                    </q-tooltip>
                </q-btn>

                <q-btn icon="view_list" color="positive" dense outline ripple class="q-mr-sm" @click="testviewRecordClick(props.row)">
                    <q-tooltip>
                        View
                    </q-tooltip>
                </q-btn>

                <!-- <q-btn icon="delete_outline" color="negative" dense outline ripple class="q-mr-sm" @click="testdeleteRecordClick(props.row)">
                    <q-tooltip>
                        Delete
                    </q-tooltip>
                </q-btn> -->

            </q-td>
        </template>
        <template v-slot:body-cell-list_status="props">
            <q-td>
                {{map_status(props.row)}}
            </q-td>
        </template>
    </q-table>
</div>
</template>

<script>
import {
    SessionStorage
} from 'quasar'
import axios from 'axios'
export default {
    data() {
        return {
            columns: [{
                    name: 'action',
                    required: true,
                    label: 'Actions',
                    align: 'left',
                    sortable: false
                },
                {
                    name: 'refno',
                    label: 'TTA Refno',
                    field: 'refno',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'supplier_name',
                    label: 'Supplier',
                    field: 'supplier_name',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'tta_period_from',
                    label: 'TTA Period From',
                    field: 'tta_period_from',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'tta_period_to',
                    label: 'TTA Period To',
                    field: 'tta_period_to',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'list_status',
                    label: 'Status',
                    field: 'list_status',
                    align: 'left',
                    sortable: true
                },
                // {
                //     name: 'status_date',
                //     label: 'Status Date',
                //     field: 'status_date',
                //     align: 'left',
                //     sortable: true
                // }
            ],
            tta_list: [],
            tta_status: []
        }
    },
    componenets: {

    },
    created() {
        this.$store.dispatch('tta/get_api_tta_list', sessionStorage.getItem('customer_guid')).then(() => {
            this.tta_list = JSON.parse(JSON.stringify(this.$store.getters['tta/tta_list']));
        });
        axios
            .get('/mc_tta_list_status/mc_TtaListStatus/')
            .then((response) => {
                this.tta_status = response.data.results
            })
            .catch((error) => {
                this.showNotify('negative', JSON.stringify(error))
            })
        // let key ='guid'
        // let value = '13124235'
        // SessionStorage.set(key, value)
        // // let value123 = this.$q.SessionStorage.get.item(key)
        // let item = SessionStorage.get.all()
        // console.log(item)
    },
    computed: {
    },
    methods: {
        addRecordClick() {
            alert('Parent method trigger Add')
        },
        testEditRecordClick(item) {
            // alert('Parent method trigger Edit ' +
            //     item.refno + ' ' + item.supplier_name
            // )
            this.$router.push("tta_form?refno=" + item.refno)
        },
        testDeleteRecordClick(item) {
            alert('Parent method trigger Delete ' +
                item.code + ' ' + item.description
            )
        },
        testViewRecordClick(item) {
            alert('Parent method trigger view ' +
                item.code + ' ' + item.description
            )
        },
        map_status(tta_data) {
            let status_desc = '';
            for (var status_key in this.tta_status) {
                if (tta_data.list_status == status_key) {
                    return this.tta_status[status_key].status_description
                }
            }
        }
    }
}
</script>
