<template>
  <div v-if="showComponent && $q.screen.width > 599">
    <q-item class="breadcrumb-container fade-in">
      <q-item-section v-if="isPurchaseOrGRN">
        <q-item-label class="breadcrumb-label">
          {{ currency_sign }} {{ formattedTotal }}
          <q-tooltip class="q-pa-sm" :delay="100" :offset="[-20, 20]" anchor="bottom middle" self="top middle" transition-show="scale" transition-hide="scale">
            <strong>Total Amount</strong>
          </q-tooltip>
        </q-item-label>
      </q-item-section>
      <q-item-section v-else-if="isDebitOrCreditNote">
        <q-item-label class="breadcrumb-label">
          {{ currency_sign }} {{ formattedSubTotal1 }}
          <q-tooltip class="q-pa-sm" :delay="100" :offset="[-20, 20]" anchor="bottom middle" self="top middle" transition-show="scale" transition-hide="scale">
            <strong>Total Amount</strong>
          </q-tooltip>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  props: {
    refno: {
      type: String,
      required: true
    },
    pageFunction: {
      type: String,
      required: true
    },
    total: {
      type: Number,
      default: null
    },
    subTotal1: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      currency_sign: sessionStorage.getItem("currency_sign") || '',
      user_name: sessionStorage.getItem("user_name") || '',
      showComponent: false,
      isLoading: true,
    };
  },
  computed: {
    isPurchaseOrGRN() {
      return this.pageFunction === 'EditPurchaseOrder' || this.pageFunction === 'EditGoodsReceivedNote';
    },
    isDebitOrCreditNote() {
      return this.pageFunction === 'EditDebitNote' || this.pageFunction === 'EditCreditNote';
    },
    formattedTotal() {
      return this.formatAmount(this.total, '$');
    },
    formattedSubTotal1() {
      return this.formatAmount(this.subTotal1, '');
    }
  },
  async created() {
    this.checkRefno();
    if (this.showComponent) {
      await this.fetchData();
    }
  },
  methods: {
    checkRefno() {
      this.showComponent = !!this.refno;
    },
    async fetchData() {
      this.isLoading = true;
      try {
        if (this.isPurchaseOrGRN) {
          await this.fetchTotal();
        } else if (this.isDebitOrCreditNote) {
          await this.fetchSubTotal1();
        }
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTotal() {
      const payload = {
        RefNo: this.refno,
        user: this.user_name,
        language: sessionStorage.getItem("language") || 'en'
      };

      try {
        let data;
        if (this.pageFunction === 'EditPurchaseOrder') {
          await this.$store.dispatch('purchase/trigger_read_po_by_refno', payload);
          data = this.$store.getters['purchase/get_read_po_by_refno'];
        } else if (this.pageFunction === 'EditGoodsReceivedNote') {
          await this.$store.dispatch('purchase/trigger_read_gr_by_refno', payload);
          data = this.$store.getters['purchase/get_read_gr_by_refno'];
        }
        this.$emit('total-updated', data?.response?.Total || 0);
      } catch (error) {
        console.error("Error fetching total:", error);
        this.$emit('total-updated', 0);
      }
    },
    async fetchSubTotal1() {
      const payload = { RefNo: this.refno };

      try {
        let data;
        if (this.pageFunction === 'EditDebitNote') {
          await this.$store.dispatch('purchase/trigger_read_dn_by_refno', payload);
          data = this.$store.getters['purchase/get_read_dn_by_refno'];
        } else if (this.pageFunction === 'EditCreditNote') {
          await this.$store.dispatch('purchase/trigger_read_cn_by_refno', payload);
          data = this.$store.getters['purchase/get_read_cn_by_refno'];
        }
        this.$emit('subtotal1-updated', data?.response?.SubTotal1 || 0);
      } catch (error) {
        console.error("Error fetching subTotal1:", error);
        this.$emit('subtotal1-updated', 0);
      }
    },
    formatAmount(value, type) {
      if (value === null || value === undefined) {
        return 'Loading...';
      }

      value = Number(value);
      if (isNaN(value)) {
        console.error("Invalid value:", value);
        return '';
      }

      if (type === "$") {
        value = value.toFixed(2);
      } else if (type === "%") {
        value = value.toFixed(1);
      } else if (type === "qty") {
        value = value.toFixed(0);
      }

      const parts = value.toString().split(".");
      const numberPart = parts[0];
      const decimalPart = parts[1];

      const thousands = /\B(?=(\d{3})+(?!\d))/g;
      const formattedNumber = numberPart.replace(thousands, ",");

      return formattedNumber + (decimalPart ? "." + decimalPart : "");
    }
  },
  watch: {
    '$route.query.refno': 'checkRefno',
    total(newVal) {
      this.$emit('total-updated', newVal);
    },
    subTotal1(newVal) {
      this.$emit('subtotal1-updated', newVal);
    }
  }
};
</script>

<style scoped>
.breadcrumb-container {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  min-height: 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 3.6px 0px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}

.breadcrumb-label {
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #203755;
  font-family: InterfontBold;
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
</style>
