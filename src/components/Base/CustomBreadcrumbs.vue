<template>
  <q-breadcrumbs v-if="$q.screen.width > 599" class="">
    <template v-slot:separator>
      <!-- <q-icon size="1.5em" name="chevron_right" color="grey" style="padding: 0 12px" /> Desmond change-->
      <q-icon size="1.5em" name="chevron_right" color="grey" style="padding: 0px" />
    </template>
    <q-breadcrumbs-el v-for="(crumb, index) in crumbs" :key="index">
      <router-link v-if="crumb.to && !['Edit Purchase Order', 'Edit Goods Received Note', 'Edit Debit Note', 'Edit Credit Note', 'Edit Item Master'].includes(crumb.label)" :to="crumb.to" class="breadcrumb-link">
        <q-item :class="['breadcrumb-container', { active: crumb.active }]">
          <q-item-section v-if="crumb.icon" avatar>
            <q-img :src="`/${crumb.icon}.svg`" class="breadcrumb-icon" :class="{ active: crumb.active }" />
          </q-item-section>
          <q-item-section :class="{ 'no-icon': !crumb.icon }">
            <q-item-label :class="['breadcrumb-label', { active: crumb.active }]">
              {{ crumb.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </router-link>
      <q-item v-else :class="['breadcrumb-container', { active: crumb.active }]">
        <q-item-section v-if="crumb.icon" avatar>
          <q-img :src="`/${crumb.icon}.svg`" class="breadcrumb-icon" :class="{ active: crumb.active }" />
        </q-item-section>
        <q-item-section :class="{ 'no-icon': !crumb.icon }">
          <q-item-label :class="['breadcrumb-label', { active: crumb.active }]">
            {{ crumb.label }}
            <q-tooltip class="q-pa-sm" :delay="100" :offset="[-20, 20]" anchor="bottom end" self="top end" transition-show="scale" transition-hide="scale">
              <strong>{{ ['Edit Purchase Order', 'Edit Goods Received Note', 'Edit Debit Note', 'Edit Credit Note'].includes(crumb.label.split(' / ')[0]) ? 'Reference No' : 'Item Code' }}</strong>
            </q-tooltip>
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-breadcrumbs-el>
  </q-breadcrumbs>
</template>

<script>
export default {
  name: 'CustomBreadcrumbs',
  props: {
    crumbs: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>

<style scoped>
.page-section {
  display: flex;
  padding: 24px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  background: #F4F7FE;
}
.breadcrumb-link {
  text-decoration: none;
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  /* padding: 10px 16px; Desmond change*/
  padding: 5px 10px;
  min-height: 0;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0px 0px 3.6px 0px rgba(0, 0, 0, 0.25);
}

.q-item__section--avatar {
  min-width: 0;
}

.breadcrumb-icon {
  /* width: 18px;
  height: 18px; Desmond change*/

  width: 12px;
  height: 12px;
}

.breadcrumb-icon.active {
  color: #203755;
  filter: brightness(0) saturate(100%) invert(17%) sepia(14%) saturate(2541%) hue-rotate(174deg) brightness(96%) contrast(88%);
}

.breadcrumb-label {
  /* font-size: 16px; Desmond change*/
  text-align: center;
  font-size: 12px;
  color: #848484;
  font-family: InterfontBold;
  font-weight: 700;
}

.breadcrumb-label.active {
  color: #203755;
  font-weight: bold;
}
</style>
