<template>
  <div class="container">
    <button class="button-back" @click="$router.back()">
      {{ `< Back to list` }}
    </button>
    <item-content :columns="columns" :row="item" is-detail />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ItemContent from "@/components/ItemContent.vue";

export default {
  name: "DetailView",
  components: {
    ItemContent,
  },
  computed: {
    ...mapGetters({
      item: "getCurrent",
    }),
    columns() {
      if (!this.item) {
        return [];
      }
      return Object.keys(this.item);
    },
  },
  mounted() {
    if (!this.item) {
      this.$router.replace("/");
    }
  },
};
</script>

<style scoped lang="scss">
@import url("/src/assets/styles/main.scss");

.button-back {
  background: white;
  margin-left: -1px;
  color: black;
  border: 1px solid gray;
  display: flex;
  height: 30px;
  min-width: 30px;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: gray;
    color: white;
  }

  &_active {
    pointer-events: none;
    cursor: auto;
    font-weight: 700;
    color: black;
    border-color: black;
  }
}
</style>
