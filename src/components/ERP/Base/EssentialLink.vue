<template>
  <q-item
    :key="isActive"
    :class="['essential-link', { 'active-link': isActive }]"
    clickable
    tag="a"
    :href="link"
    :style="activeStyle"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :class="activeIconClass" :style="{ fontSize: icon_size }" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption v-if="caption">
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute, watch } from 'vue-router';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '#',
    },
    icon: {
      type: String,
      default: '',
    },
    icon_size: {
      type: String,
      default: '',
    },
  },
  data() {
    const route = useRoute();
    return {
      route,
      isActive: this.isLinkActive(route),
    };
  },
  watch: {
    '$route.fullPath': function () {
      this.isActive = this.isLinkActive(this.route);
    },
  },
  methods: {
    normalizePath(path) {
    return path.replace(/\/$/, '').toLowerCase();
  },

  isLinkActive(route) {
    const normalizedLinkPath = this.normalizePath(this.link.replace('/#', ''));
    const normalizedFullPath = this.normalizePath(route.fullPath);

    // console.log('normal link path:', normalizedLinkPath);
    // console.log('normal full path:', normalizedFullPath);

    const linkConditions = {
      '/erp/purchase/purchaseorder': [
        '/erp/purchase/editpurchaseorder',
        '/erp/purchase/viewpurchaseorder',
        '/erp/purchase/createpurchaseorder',
        '/erp/purchase/createpurchaseorderdetails'
      ],
      '/erp/purchase/goodsreceivednote': [
        '/erp/purchase/editgoodsreceivednote',
        '/erp/purchase/creategoodsreceivednotedetails',
        '/erp/purchase/simplereceive'
      ],
      '/erp/purchase/debitnote': [
        '/erp/purchase/editdebitnote',
        '/erp/purchase/createdebitnote',
        '/erp/purchase/createdebitnotedetails'
      ],
      '/erp/purchase/creditnote': [
        '/erp/purchase/editcreditnote',
        '/erp/purchase/createcreditnote'
      ],
      '/erp/itemmaster/itemmaster': [
        '/erp/itemmaster/itemmaster',
        '/erp/itemmaster/edititemmaster',
        '/erp/itemmaster/createitemmaster',
        '/erp/itemmaster/imjconfirm'
      ],
      '/erp/itemmaster/createeditim_new': [
        '/erp/itemmaster/createeditim_new'
      ]
    };

    let isActive = normalizedFullPath === normalizedLinkPath;

    if (linkConditions[normalizedLinkPath]) {
      isActive = linkConditions[normalizedLinkPath].some(path => normalizedFullPath.startsWith(path)) || isActive;
    }

    // console.log('sama base path:', isActive);
    return isActive;
  },
  },
  computed: {
    activeStyle() {
      return this.isActive ? { color: '#9DCDFF' } : { color: '#29292A' };
    },
    activeIconClass() {
      return this.isActive ? 'active-icon' : 'essential-icon';
    },
  },
});
</script>

<style scoped>
.essential-link {
  color: inherit;
}

.essential-link.active-link {
  color: #273655 !important;
  background-color: #ecf8fc;
  font-weight: 600;
  border-radius: 4px;
}

.active-link {
  color: #273655 !important;
}

.active-icon {
  color: #273655 !important;
}

.essential-icon {
  color: inherit;
}

.q-item {
  padding: 8px 10px;
}

.q-item-section[avatar] {
  display: flex;
  align-items: center;
  justify-content: center;
}

.q-item-section[avatar].active-link {
  border-radius: 50%;
}
</style>
