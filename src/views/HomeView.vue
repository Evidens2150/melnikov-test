<template>
  <div class="container">
    <ItemList />
  </div>
</template>

<script>
import ItemList from "@/components/ItemList.vue";

export default {
  name: "HomeView",
  components: {
    ItemList,
  },
};
</script>

<style scoped lang="scss">
@import url("/src/assets/styles/main.scss");
</style>
