<template>
  <q-form ref="submit_form" style="max-height:100%" :class="{ 'submit_form': $q.screen.width > 599, 'submit_form_mobile': $q.screen.width < 600 }">
    
    <!-- <div class="chip-container">
    <Chip v-if="$q.screen.width < 600" :text="'Outlet'" icon='img:/outlet.svg' color="grey-6" class="bold-font custom-chip-padding"/>
    </div> -->
    <!-- <div
      class="row row_section"
      style="padding: 0px; margin-bottom: 10px; margin-left: 12px"
    >
      

      <Title
        :text="'Outlet'"
        :noFilter="true"
        :filter_status="filter_status"
        v-on:receiveFilter="handleReceiveFilter"
        
      />
    </div> -->
<!-- <div class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <Chip text="Location" icon="fmd_good"/> / <Chip text="Outlet" icon="public"/>
    </div> -->
    <div class="row "> <!--row_section-->
      <div
        class="card_section col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12"
        
      >
        <!-- <q-btn color="deep-orange" push>
            <div class="row items-center no-wrap">
                <q-icon center name="map" />
                <div class="text-center">
                    TESTING
                </div>
            </div>
        </q-btn> -->

        <div class="row col-12 card_custom q-pt-md" :style="{gap: $q.screen.width < 600 ? '16px' : '24px'}">
          <template v-for="(details, index) in outlet_json" :key="details">
            <div
              class="card_section col-xs-12 col-sm-12 col-md-2 col-lg-2 col-xl-2"
              style="margin-bottom: 10px"
            >
              <!-- <q-btn
                        style="width: 100%; height: 100%;"
                        padding="lg"
                        color="primary"
                        :label="details.label"
                        @click="handleClickOutlet(details)"
                    /> -->
                  <card
                    class="outlet-card"
                    :img="illustrations[index % illustrations.length]"
                    :storeTitle="details.label"
                    stack
                    @click="handleClickOutlet(details)"
                  />
            </div>
          </template>
        </div>

        <!-- {{ this.$global_config }} -->
      </div>
    </div>
  </q-form>
</template>

<script>
// import Input from 'src/components/ERP/Base/Input';
import Label from "src/components/ERP/Base/Label";
import Table from "src/components/ERP/Base/Table";
import LabelInputHorizontal from "src/components/ERP/General/LabelInputHorizontal";
import LabelSelectFilterHorizontal from "src/components/ERP/General/LabelSelectFilterHorizontal";
import SelectFilter from "src/components/ERP/Base/SelectFilter";
import Button_icon from "src/components/ERP/Base/Button_icon";
import TablePagination from "src/components/ERP/Base/TablePagination";
import Chip from "src/components/ERP/Base/Chip";
// import Input from 'src/components/ERP/Base/Input';
import { ref } from "vue";
import { Notify } from "quasar";
import { Loading, QSpinnerTail } from "quasar";
import Title from "src/components/ERP/General/Title";
// import Button from 'src/components/Base/Button';
import card from "src/components/ERP/Base/card";
export default {
  name: "Dashboard",
  data() {
    return {
      outlet_json: [],
      tab: "country",
      table_data: [],
      table_column: [
        {
          name: "action",
          required: true,
          label: "Actions",
          align: "left",
          sortable: false,
        },
        {
          align: "right",
          field: "dept_code",
          sortable: true,
          name: "dept_code",
          label: "Dept Code",
          required: true,
        },
        {
          align: "left",
          field: "dept_desc",
          sortable: true,
          name: "dept_desc",
          label: "Dept Description",
          required: true,
        },
        {
          align: "left",
          field: "group_code",
          sortable: true,
          name: "group_code",
          label: "Group",
          required: true,
        },
        {
          align: "left",
          field: "created_at",
          sortable: true,
          name: "created_at",
          label: "Created at",
          required: true,
        },
        {
          align: "left",
          field: "created_by",
          sortable: true,
          name: "created_by",
          label: "Created by",
          required: true,
        },
        {
          align: "left",
          field: "updated_at",
          sortable: true,
          name: "updated_at",
          label: "Updated at",
          required: true,
        },
        {
          align: "left",
          field: "updated_by",
          sortable: true,
          name: "updated_by",
          label: "Updated by",
          required: true,
        },
      ],
      test_data: [],
      test_column: [],
      ori_params: {},
      showAddTask: false,
      json_new: {},
      is_update: false,
      continent_options: [],
      currency_options: [],
      country_options: [],
      region_options: [],
      state_options: [],
      active_delete_json: {},
      delete_confirmation: false,
      company_guid:
        sessionStorage.getItem("company_guid") != "" &&
        sessionStorage.getItem("company_guid") != "null" &&
        sessionStorage.getItem("company_guid") != null
          ? sessionStorage.getItem("company_guid")
          : "",
      folder_path: "",
      outlet_list:
        sessionStorage.getItem("outlet_list") != "" &&
        sessionStorage.getItem("outlet_list") != "null" &&
        sessionStorage.getItem("outlet_list") != null
          ? JSON.parse(sessionStorage.getItem("outlet_list"))
          : [],
      illustrations: [
        "card_illustration_1.svg",
        "card_illustration_2.svg",
        "card_illustration_3.svg",
        "card_illustration_4.svg",
        "card_illustration_5.svg",
        "card_illustration_6.svg",
      ],
      selectedIllustrationIndex: 0, // Initialize the index to a constant value
    };
  },
  components: {
    // Input,
    Label,
    // Table,
    LabelInputHorizontal,
    LabelSelectFilterHorizontal,
    TablePagination,
    Chip,
    // Input,
    Button_icon,
    Title,
    card,
  },
  computed: {
    dbComponentBehavior() {
      return this.$store.getters["dbComponentBehavior/byLanguage"]("erp");
    },
  },
  async created() {},
  async mounted() {
    this.showLoading();

    this.folder_path = this.$global_config.folder_path;

    var payload = {
      params: {
        ordering: "-updated_at",
      },
      this: this,
    };

    var array = [];

    if (this.outlet_list.length > 0) {
      for (const index in this.outlet_list) {
        console.log("this.outlet_list", this.outlet_list[index]);
        var object = {
          label: this.outlet_list[index].outlet_code,
          value: this.outlet_list[index].outlet_guid,
          ip: this.outlet_list[index].ip_url + "/" + this.folder_path + "/",
          outlet_code: this.outlet_list[index].outlet_code,
          outlet_guid: this.outlet_list[index].outlet_guid,
        };

        array.push(object);
      }

      this.outlet_json = array;
    } //close checking see login got session outlet or not

    // await this.$store.dispatch('location/trigger_get_cp_set_branch', payload).then(() => {
    //     var data = JSON.parse(JSON.stringify(this.$store.getters['location/get_cp_set_branch']));
    //     var results = data.response.detail;

    //     for (const index in results) {

    //         var object = {
    //             label: results[index].BRANCH_CODE,
    //             value: results[index].BRNACH_GUID,
    //             ip: results[index].url+"/"+this.folder_path+"/",
    //             outlet_code: results[index].BRANCH_CODE
    //         };

    //         array.push(object);

    //     }//close for loop

    //     // array.push({
    //     //         label: "OUTLET A",
    //     //         value: "OUTLET A",
    //     //         ip: "http://office.panda-eco.com:53002/"+this.folder_path+"/",
    //     //     });

    //     this.outlet_json = array;

    //     // this.outlet_json = [
    //     //     {
    //     //         label: "OUTLET A",
    //     //         value: "OUTLET A",
    //     //         ip: "http://office.panda-eco.com:53004/"+this.folder_path+"/",
    //     //     },
    //     //     {
    //     //         label: "OUTLET B",
    //     //         value: "OUTLET B",
    //     //         ip: "http://office.panda-eco.com:53002/"+this.folder_path+"/",
    //     //     }
    //     // ];

    //     // var ary = [];

    //     // for(var i in results)
    //     // {
    //     //     var continent = results[i];
    //     //     var obj = {
    //     //         label: continent.code + ' - ' + continent.description,
    //     //         value: continent.con_guid
    //     //     }
    //     //     ary.push(obj);
    //     // }

    //     // this.continent_options = ary;
    // });

    this.hideLoading();

    // this.outlet_json = [
    //     {
    //         label: "OUTLET A",
    //         value: "OUTLET A",
    //         ip: "http://office.panda-eco.com:53004/"+this.folder_path+"/",
    //     },
    //     {
    //         label: "OUTLET B",
    //         value: "OUTLET B",
    //         ip: "http://office.panda-eco.com:53002/"+this.folder_path+"/",
    //     }
    // ];
  },
  methods: {
    // getRandomIllustration() {
    //   const randomIndex = Math.floor(Math.random() * this.illustrations.length);
    //   return this.illustrations[randomIndex];
    // },
    async handleClickOutlet(payload) {
      this.showLoading();

      var ip = payload.ip;

      console.log(ip);

              
      var xpayload = {
        "pass_json": {
          "outlet_guid": payload.outlet_guid,
          "language": sessionStorage.getItem('language'),
          "skip": 0,
          "limit": 1,
          "BRANCH_CODE": payload.outlet_code
        }//pass_json should be the field or data wish to be created.
      };

      var object_pass = {
        "dispatch": 'location/trigger_post_cp_set_branch_general', //refer to path/function_name in store actions.js
        "getter": 'location/get_cp_set_branch_general', //refer to path/function_name in store getters.js
        "app": this, //compulsory passed variable
        "payload": xpayload //payload that needed to use in store actions.js
      };

      var dispatch_response = await this.$dispatch(object_pass);

      if(dispatch_response.status)
      {
        sessionStorage.setItem('DC_CODE', dispatch_response.response.detail.length > 0 ? dispatch_response.response.detail[0].SET_SUPPLIER_CODE : '');
      }else
      {
        sessionStorage.setItem('DC_CODE', '');
      }


      sessionStorage.setItem("session_ip", this.$global_config.url);
      sessionStorage.setItem("outlet_code", payload.outlet_code);
      sessionStorage.setItem("session_outlet_guid", payload.outlet_guid);

      // this.$global_config.url  = ip;

      var payload2 = {
        name: sessionStorage.getItem("username"),
        pwd: sessionStorage.getItem("password"),
      };

      var data = {};

      await this.$store
        .dispatch("login/trigger_get_user", payload2)
        .then(() => {
          data = JSON.parse(
            JSON.stringify(this.$store.getters["login/get_user"])
          );
        });

      if (data.status == "success") {
        this.$router.push("/erp/purchase/purchaseorder");
      } else {
        this.$store.dispatch("login/logout").then(() => {
          this.showLoading();
          var redirect_directory =
            app.config.globalProperties.$global_config.module;
          setTimeout(() => {
            this.$router.push("/" + redirect_directory + "/login");
            this.showNotify("negative", "Username or password incorrect.");
            this.hideLoading();
          }, 600);
        });
      }

      // alert('until click outlet need to shoot api and check whether need to session password for checking');

      this.hideLoading();

      return;

      this.$router.push("/erp/purchase/purchaseorder");

      this.hideLoading();

      // window.location.href = `${this.folder_path}/#/erp/purchase/purchaseorder`;
      // setTimeout(()=>{
      //     window.location = "/#/erp/purchase/purchaseorder";
      // },1000);

      // this.$router.push('/erp/purchase/purchaseorder')
      // .then(() => {
      //     window.location.reload();
      // });
    },
    showNotify(type, message) {
      Notify.create({
        type: type,
        message: message,
        timeout: 1000,
        position: "top",
        html: true,
      });
    },
    showLoading() {
      // default options
      Loading.show();

      // fully customizable
      Loading.show({
        spinner: QSpinnerTail,
        // other props
      });
    },
    hideLoading() {
      setTimeout(function () {
        Loading.hide();
      }, 300);
    },
  },
};
</script>

<style scoped>
.custom_cancel_button {
  border: 1px solid black;
}
.card_section {
  padding: 0px 0px 0px 0px;
  /* padding: 0px 10px; */
}

.row_section {
  padding-left: 10px;
  right: 10px;
}

.card_design {
  width: 700px;
  max-width: 800vw;
}

.table_wrapper {
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 2px;
  padding-right: 2px;
}

* >>> .q-tab__content {
  color: white !important;
}

* >>> .q-tab--active {
  color: white !important;
}

* >>> .q-tab__indicator {
  color: white !important;
}

.submit_form {
  padding: 0px 24px;
 
}
.submit_form_mobile {
  padding: 16px;
  
}
.illustration-card {
  width: 94px;
  height: 94px;
  transition: width 0.2s ease-in-out, height 0.2s ease-in-out;
}
.illustration-card:hover {
  width: 100px;
  height: 100px;
}

 /* *>>>.q-gutter-y-md > *, .q-gutter-md > * {
    margin-top: 0px !important;
} */
 *>>>.q-gutter-y-md {
  margin-top: 0px !important;
 }

@media only screen and (max-width: 599px) {
  .outlet-card {
  width: 204px;
  height: 164px;
  padding: 20px 70px;
  }
  /* padding-left: ;*/
 .custom-chip-padding {
  padding: 11px; /* Adjust the padding as needed */
  border-radius: 8px;
  background: #FFF !important;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}
.bold-font {
  font-family: InterfontBold;
  font-weight: 700;
  font-size: 16px;
}
  
}

@media only screen and (min-width: 1024px) {
  /* .card_custom {
  margin-left: -16px;
  
} */
 .outlet-card {
   width: 204px;
  /* height: 260px;*/
  padding: 48px 0px 40px 0px;
  /* padding-left: ;*/
  
}
}
</style>
