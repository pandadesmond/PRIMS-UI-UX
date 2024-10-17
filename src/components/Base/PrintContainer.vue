<template>
  <div v-if="shouldShow && $q.screen.width > 599">
    <q-item class="print-container fade-in" clickable @click="handlePrint">
      <q-item-section>
        <img src="/print.svg" class="print-icon" />
        <q-tooltip class="q-pa-sm" :delay="100" :offset="[-20, 20]" anchor="bottom middle" self="top middle" transition-show="scale" transition-hide="scale">
          <strong>Print</strong>
        </q-tooltip>
      </q-item-section>
    </q-item>
  </div>
  <q-dialog v-model="warning_report_dialog" persistent position="top">
    <q-card style="width: 700px; max-width: 80vw; text-align: center; margin-top: 5%;border-radius:8px">
      <q-card-section class="theme_color row items-center" style="padding: 8px 24px; border-bottom: 1px solid #a7bbcb;">
        <div class="dialog_confirmation_title">{{ dialogTitle }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup :disable="showAddLoading" />
      </q-card-section>

      <q-card-section style="padding:16px">
        <PrintListTable
          hide_footer
          :group_button="group_button"
          :select_all="select_all"
          :readonly_button="false"
          :row_per_page="[0]"
          :top_button="false"
          :top_button_dropdown="false"
          :title="table_title"
          :table_data="rows_print"
          :table_column="columns_print"
          :action_button="true"
          :edit_button="false"
          :view_button="false"
          :delete_button="canDelete"
          :flat_status="true"
          :bordered_status="true"
          @receiveRequestTable="handlePrintTableChange"
          @onRowClick="handlePrintSelect"
        />
      </q-card-section>

      <q-card-actions align="right" style="padding-bottom: 16px; padding-top:0px; padding-right: 16px">
        <q-btn outline flat :label="$language('D0116')" font_color="#29292A" color="#29292A" class="dialog_confirm_cancel_button" @click="closeDialog" />
        <q-btn :flat="true" :outline="false" label="Print" :color="'#1E90FF'" class="dialog_confirm_print_button" @click="handlePrintWarning" />
      </q-card-actions>

      <q-inner-loading :showing="printLoading" color="primary" />
    </q-card>
  </q-dialog>
</template>

<script>
import { Notify, Loading, QSpinnerTail } from 'quasar';
import PrintListTable from 'src/components/ERP/Purchase/PrintListTable';
import Button_icon from 'src/components/ERP/Base/Button_icon';
import Input from 'src/components/ERP/Base/Input'
export default {
  components: {
    PrintListTable, 
    Input,
    Button_icon 
  },
  props: {
    pageFunction: {
      type: String,
      required: true
    },
    json: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      warning_report_dialog: false,
      dialogTitle: '',
      table_title: '',
      group_button: false,
      select_all: false,
      canDelete: false,
      rows_print: [],
      columns_print: [],
      printLoading: false,
    };
  },
  computed: {
    shouldShow() {
      return ['EditPurchaseOrder', 'EditGoodsReceivedNote', 'EditDebitNote', 'EditCreditNote'].includes(this.pageFunction);
    }
  },
  watch: {
    pageFunction(newPageFunction, oldPageFunction) {
      
      if (newPageFunction !== oldPageFunction) {
        this.setupDialogContent(); 
      }
    }
  },
  methods: {
    async handlePrint() {
      try {
        console.log("Debug: Received json prop in handlePrint:", this.json);
        this.showLoading();
        const RefNo = this.json.RefNo;
        const lookupdb_name = this.json.session_outlet_guid;
        console.log("lookupdb_name (session_outlet_guid):", lookupdb_name); // Debugging log

        const set_query = {
          ERefNo: RefNo,
          EUser: this.json.user_name,
          getuser: this.json.user_name
        };

        const json_runtime_runscript_multi = {
          params: [
            {
              lookupdb_name: lookupdb_name,
              trans_group: this.getTransGroup(),
              trans_type: '#Before print',
              set_query: set_query
            }
          ]
        };

        if (!json_runtime_runscript_multi.params[0].lookupdb_name) {
          throw new Error("Missing required field: lookupdb_name");
        }

        const payload_runtime_runscript_multi = {
          pass_json: json_runtime_runscript_multi
        };

        const dispatch_response = await this.runscript_multi(payload_runtime_runscript_multi, '1');

        if (dispatch_response.status) {
          this.hideLoading();
          this.warning_report_dialog = true;
          // this.showNotify('positive', 'Print setup completed successfully.');
        } else {
          this.hideLoading();
          this.showNotify('negative', dispatch_response.message);
        }
      } catch (error) {
        this.hideLoading();
        this.showNotify('negative', `An error occurred: ${error.message}`);
        console.error(error);
      }
    },
    handlePrintWarning() {
      const refno = this.json.RefNo;
      this.$router.push({ name: 'PrintWarningMessage', query: { refno: refno, header: this.getHeader() } });
      this.closeDialog();
    },
    handlePrintTableChange() {
      this.columns_print = [
        {
          name: 'title',
          required: true,
          label: 'Title',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
          sortable: false
        }
      ];
      this.rows_print = {
        data: {
          results: [
            {
              title: `${this.getHeader()} Audit List - Warning Message Details`,
            },
            {
              title: 'Report',
            }
          ]
        }
      };
    },
    async handlePrintSelect(row) {
      this.rows_print.data.results.forEach(r => {
        r.selected = false;
      });
      row.selected = true;
    },
    closeDialog() {
      this.warning_report_dialog = false;
    },
    getTransGroup() {
      switch (this.pageFunction) {
        case 'EditPurchaseOrder':
          return 'PO';
        case 'EditGoodsReceivedNote':
          return 'GRN';
        case 'EditDebitNote':
          return 'GRDN';
        case 'EditCreditNote':
          return 'CN';
        default:
          return '';
      }
    },
    getHeader() {
      switch (this.pageFunction) {
        case 'EditPurchaseOrder':
          return 'PO';
        case 'EditGoodsReceivedNote':
          return 'GRN';
        case 'EditDebitNote':
          return 'DN';
        case 'EditCreditNote':
          return 'CN';
        default:
          return '';
      }
    },
    showNotify(type, message) {
      if (type === "negative") {
        Notify.create({
          group: 'my-group',
          type: type,
          message: message,
          html: true,
          timeout: 99999999999,
          position: 'top',
          actions: [
            { icon: 'close', color: 'white', round: true, handler: () => { /* ... */ } }
          ],
          badgeStyle: "opacity: 0",
        });
      } else if (type === "positive") {
        Notify.create({
          group: 'my-group',
          type: type,
          message: message,
          html: true,
          timeout: 1000,
          position: 'top',
          badgeStyle: "opacity: 0",
        });
      }
    },
    showLoading() {
      Loading.show({
        spinner: QSpinnerTail,
      });
    },
    hideLoading() {
      Loading.hide();
    },
    async runscript_multi(payload, seq) {
      const object_pass = {
        dispatch: 'purchase/trigger_runtime_runscript_multi',
        getter: 'purchase/get_runscript_multi_status',
        app: this,
        payload: payload,
      };
      const dispatch_response_array = await this.$dispatch(object_pass);

      if (dispatch_response_array.status) {
        const dispatch_response = dispatch_response_array.response.map(item => item.response_json);
        return seq === '1' ? dispatch_response[0] : dispatch_response;
      } else {
        return dispatch_response_array;
      }
    },
    setupDialogContent() {
      switch (this.pageFunction) {
        case 'EditPurchaseOrder':
          this.dialogTitle = 'PO Print';
          this.table_title = 'Purchase Order List';
          this.canDelete = true;
          break;
        case 'EditGoodsReceivedNote':
          this.dialogTitle = 'GRN Print';
          this.table_title = 'Goods Received Note List';
          this.canDelete = true;
          break;
        case 'EditDebitNote':
          this.dialogTitle = 'DN Print';
          this.table_title = 'Debit Note List';
          this.canDelete = false;
          break;
        case 'EditCreditNote':
          this.dialogTitle = 'CN Print';
          this.table_title = 'Credit Note List';
          this.canDelete = false;
          break;
      }
      this.handlePrintTableChange();
    }
  },
  mounted() {
    this.setupDialogContent();
  }
};
</script>

<style scoped>
.dialog_confirmation_title {
  color: #FFF;
  text-align: center;
  font-family: InterfontSemiBold;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
}
.print-container {
  display: flex;
  text-align: center;
  align-items: center;
  padding: 8px 8px;
  min-height: 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 3.6px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
.print-icon {
  width: 18px;
  height: 18px;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.fade-in {
  animation: fadeIn 1.5s ease-in-out;
}
.dialog_confirm_cancel_button{
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  border: 2px solid #D9D9D9;
  border-radius: 8px;
  width: 112px;
  height: 48px;
}
.dialog_confirm_print_button {
  padding: 16px;
  justify-content: center;
  align-items: center;
  font-size: 16px !important;
  font-style: normal;
  font-weight: 700;
  font-family: InterfontBold;
  /* border: 2px solid #1E90FF; */
  background-color: #1E90FF;
  color: #FFF;
  border-radius: 8px;
  width: 112px;
  height: 48px;
}
</style>