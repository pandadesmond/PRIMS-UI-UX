<template>
  <q-card  v-if="$q.screen.width > 599" :class="['custom-card', {'card-clicked': isClicked}]" bordered class="full-width q-gutter-y-md">
    <div class="card-content justify-center" @mouseover="handleHover(true)" @mouseleave="handleHover(false)" @click="handleChange">
      <img
        :src="img"
        :class="{'card-animate': true, 'hovered': isHovered}"
      />
      <q-card-section :class="{'card-title-container': true, 'hovered': isHovered}">
        <div :class="{'card-title': true, 'hovered': isHovered}">{{ storeTitle }}</div>
      </q-card-section>
    </div>
  </q-card>
  <q-card v-else :class="['custom-card', {'card-clicked': isClicked}]" bordered class="full-width q-gutter-y-md">
    <div class="card-content justify-center" @mouseover="handleHover(true)" @mouseleave="handleHover(false)" @click="handleChange">
      <div class="card-content-flex" style="align-items: center; justify-content: center;">
      <img
        :src="img"
        :class="{'card-animate': true, 'hovered': isHovered}"
        class="card-image"
      />
      <q-card-section :class="{'card-title-container': true, 'hovered': isHovered}">
        <div :class="{'card-title': true, 'hovered': isHovered}">{{ storeTitle }}</div>
      </q-card-section>
      </div>
    </div>
  </q-card>
</template>


<script>
export default {
  name: "cardTo",
  props: ["text", "img", "storeTitle"],
  data() {
    return {
      isHovered: false,
      isClicked: false,
    };
  },
  methods: {
    handleChange: function () {
      this.isClicked = true;
      this.$emit("receiveChange");
    },
    handleHover(state) {
      this.isHovered = state;
    },
  },
};
</script>

<style scoped>
.q-btn {
  border-radius: 0px;
}
/* .q-card.hovered {
  transform: scale(1.05);
  transition: transform 0.3s;
} */
.card-content {
  text-align: center;
  /* transition: transform 0.3s; */
  cursor: pointer; /* Change cursor to pointer */
}
*.card-content .q-gutter-y-md > *, .q-gutter-md > * {
    margin-top: 0px;
}
.custom-card {
  border-radius: 12px;
  box-shadow: 1px 1px 10.6px 0px rgba(0, 0, 0, 0.30);
}


.card-animate {
  display: block;
  margin: 0 auto;
  width: 94px;
  height: 94px;
  transition: width 0.3s, height 0.3s;
}

.card-animate.hovered {
  width: 100px;
  height: 100px;
}


.card-title-container {
  margin-top: 0px; /* Adjust as needed */
  transition: margin-top 0.3s;
}

.card-title-container.hovered {
  margin-top: 0px; /* Adjust as needed */
}

.card-title {
  font-size: 28px;
  transition: font-size 0.3s;
  font-family: InterfontBold;
  font-weight: 700;
  color: #273655;
}

.card-title.hovered {
  font-size: 30px;
}
.card-clicked {
  border: 3px solid #90a8d6;
}
.card-content-flex {
  display: flex;
  align-items: center;
  
}
@media only screen and (max-width: 599px) {
  .outlet-card {
  width: 204px;
  height: 164px;
  padding: 32px 86px;
  }
  /* padding-left: ;*/
 .card-content {
  width: 200px;
 }
 .q-card__section--vert {
    padding: 0px;
}
  
}

</style>