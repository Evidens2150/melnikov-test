<template>
  <loader-ring v-if="!currentList.length" />
  <div class="content" v-else>
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th v-for="(col, index) in columns" :key="index">
              {{ col }}
            </th>
          </tr>
        </thead>
        <tbody>
          <item-content
            v-for="row in currentList"
            :key="row.cell"
            :columns="columns"
            :row="row"
            @onClickRow="onClickRow(row)"
          />
        </tbody>
      </table>
    </div>
    <list-pagination
      :current="currentPage"
      :pageSize="currentSize"
      @update:current="handlePageChange"
      @update:pageSize="handlePageSizeChange"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ItemContent from "@/components/ItemContent.vue";
import ListPagination from "@/components/ListPagination.vue";
import LoaderRing from "@/components/LoaderRing.vue";

export default {
  name: "ItemList",
  components: {
    ItemContent,
    ListPagination,
    LoaderRing,
  },
  data() {
    return {
      currentPage: 1,
      currentSize: 10,
      columns: ["picture", "name", "gender", "email", "phone"],
    };
  },
  computed: {
    ...mapGetters({
      currentList: "getList",
    }),
  },
  beforeMount() {
    if (!this.$route.query.page) {
      this.$router.replace({
        query: { page: 1, size: 10 },
      });
    }
    this.currentPage = +this.$route.query.page;
    this.currentSize = +this.$route.query.size;
  },
  mounted() {
    if (!this.currentList.length) {
      this.updateList();
    }
  },
  methods: {
    async updateList() {
      await this.$store.dispatch("fetchList", {
        page: this.currentPage,
        results: this.currentSize,
      });
    },
    onClickRow(row) {
      this.$store.dispatch("setCurrent", row);
      this.$router.push({ name: "detail" });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.updateList();
    },
    handlePageSizeChange(size) {
      if (this.currentSize !== size) {
        this.currentPage = 1;
      }
      this.currentSize = size;
      this.updateList();
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.table-wrapper {
  overflow: auto;
  max-width: 100%;
  max-height: 80vh;
  padding-right: 5px;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f3f3;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ced4da;
    border-radius: 4px;
    border: 3px solid #ced4da;
  }
  scrollbar-width: thin;
  scrollbar-color: #ced4da #f3f3f3;
}
table {
  border-collapse: collapse;
}
th {
  border: 1px solid #ced4da;
  padding: 5px;
}
</style>
