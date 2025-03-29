<template>
  <q-header>
    <q-toolbar class="toolbar-container"  >
      <!-- mobile hamburger -->
      <q-btn v-if="$q.screen.lt.sm" flat dense round icon="menu" aria-label="Menu" @click="toggleDrawer"/>

      <div class="row col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12" style="justify-content: space-between;">
        <div class="row items-center">
          <template v-for="item in menuItems" :key="item">
            <MenuItem v-if="item.child"
              :item="item"
              :activeItem="activeItem"
              @set-active="setActiveMenu(item.name)"
            />
            <q-btn v-else
              :label="item.name"
              class="menu-label"
              :style="isActive(item)" 
              @click="handleClick(item)"
              unelevated
            />
          </template>
          
        </div>

        <div v-if="$q.screen.width > 599" class="profile-logo-container">
          <Profile />
          <img class="header-logo" src="panda_profile.png" />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>



<script>
import Profile from 'src/components/PRIMS/Base/Profile';
import MenuItem from 'src/components/PRIMS/Base/MenuItem';

export default {
  name: "Header",
  components: {
    Profile,
    MenuItem
  },
  data() {
    return {
      permission: localStorage.getItem("permission") != "" && localStorage.getItem("permission") != "null" && localStorage.getItem("permission") != null ? localStorage.getItem("permission") : "",
      company_guid: localStorage.getItem("company_guid") != "" && localStorage.getItem("company_guid") != "null" && localStorage.getItem("company_guid") != null ? localStorage.getItem("company_guid") : "",
      menuItems: [
        {
          name: 'TTA',
          link: '/PRIMS/TTA',
        },
        {
          name: 'Claim',
          link: '/PRIMS/Claim',
          child: [
            {
              name: 'Event Driven Claim',
              link: '/PRIMS/Claim/EDC',
            },
            {
              name: 'Promotion Claim',
              link: '/PRIMS/Claim/PD',
            },
          ]
        },
        {
          name: 'Transaction',
          link: '/PRIMS/Transaction',
          child: [
            {
              name: 'Invoice',
              link: '/PRIMS/Transaction/Invoice',
            },
            {
              name: 'Credit Note',
              link: '/PRIMS/Transaction/CN',
            },
            {
              name: 'Debit Note',
              link: '/PRIMS/Transaction/DN',
            },
          ]
        },
      ],
      activeItem: ''
    };
  },
  mounted(){
    if(this.permission.includes('setting'))
    {
      const item = {
        name: 'Setting',
        link: '/PRIMS/Setting',
        child: [
          // {
          //   name: 'Banner',
          //   link: '/PRIMS/Setting/Banner',
          // },
          {
            name: 'Company',
            link: '/PRIMS/Setting/Company',
          },
          {
            name: 'Condition of Trade',
            link: '/PRIMS/Setting/ConditionTrade',
          },
          {
            name: 'Document',
            link: '/PRIMS/Setting/Document',
          },
          {
            name: 'GL Code',
            link: '/PRIMS/Setting/GLCode',
          },
          {
            name: 'Tab',
            link: '/PRIMS/Setting/Tab',
          },
          {
            name: 'User',
            link: '/PRIMS/Setting/User',
          },
          {
            name: 'User Designation',
            link: '/PRIMS/Setting/UserDesignation',
          },
          {
            name: 'User Group',
            link: '/PRIMS/Setting/UserGroup',
          },
        ],
      }
      this.menuItems.push(item);
    }
  },
  methods: {
    setActiveMenu(name) {
      this.activeItem = name;
    },
    isActive(item) {
      const currentPath = this.$route.path.toLowerCase();
      if (item.link) {
        var status = currentPath === item.link.toLowerCase();
      }
      else
      {
        var status = false;
      }
      return status ? { backgroundColor: "#ecf8fc", color: "#273655" } : {}; 
    },
    handleClick(item){
      console.log(item)
      if (item.link) {
        this.$router.push(item.link); 
      }
    },
    toggleDrawer() {
      this.$emit('trigger_dialog');
    }
  }
};
</script>

<style scoped>

.toolbar-container {
  color: #29292A;
  box-shadow: 0 1px 12px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.profile-logo-container {
  display: flex;
  align-items: center;
}

.header-logo {
  padding-right: 6px;
}

.menu-label {
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  text-transform: none;
}
</style>
