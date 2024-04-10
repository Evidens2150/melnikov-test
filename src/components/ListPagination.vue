<template>
  <div class="options">
    <div class="options__pagination">
      <button
        class="options__pagination__button options__pagination__button_first"
        :class="{ options__pagination__button_disabled: modelPage <= 1 }"
        @click.prevent="modelPage = 1"
      >
        {{ "<<" }}
      </button>
      <button
        class="options__pagination__button"
        :class="{ options__pagination__button_disabled: modelPage <= 1 }"
        @click.prevent="goToPrevPage"
      >
        {{ "<" }}
      </button>
      <button
        v-for="page in pages[0]"
        :key="page"
        class="options__pagination__button"
        :class="{ options__pagination__button_active: modelPage === page }"
        @click.prevent="modelPage = page"
      >
        <span>{{ page }}</span>
      </button>
      <button
        v-if="pages[1].length"
        class="options__pagination__button options__pagination__button_center"
      >
        <span>...</span>
      </button>
      <button
        v-for="page in pages[1]"
        :key="page"
        class="options__pagination__button"
        :class="{ options__pagination__button_active: modelPage === page }"
        @click.prevent="modelPage = page"
      >
        <span>{{ page }}</span>
      </button>
      <button
        class="options__pagination__button"
        :class="{
          options__pagination__button_disabled: modelPage >= maxPage,
        }"
        @click.prevent="goToNextPage"
      >
        {{ ">" }}
      </button>
      <button
        class="options__pagination__button options__pagination__button_last"
        :class="{
          options__pagination__button_disabled: modelPage >= maxPage,
        }"
        @click.prevent="modelPage = maxPage"
      >
        {{ ">>" }}
      </button>
    </div>
    <select
      :value="pageSize"
      @change="onSizeChanged"
      class="options__count-selector"
    >
      <option v-for="option in options" :key="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "ListPagination",
  props: {
    current: {
      type: Number,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  emits: ["update:current", "update:pageSize"],
  data() {
    return {
      options: [
        { value: 10, label: "10" },
        { value: 25, label: "25" },
        { value: 50, label: "50" },
      ],
    };
  },
  computed: {
    modelPage: {
      get: function () {
        return this.current;
      },
      set: function (value) {
        if (this.current !== value) {
          this.$emit("update:current", value);
          this.$router.replace({
            query: { page: value, size: this.pageSize },
          });
        }
      },
    },
    maxPage() {
      let maxPage = Math.floor(500 / this.pageSize);
      let mod = 500 % this.pageSize;
      if (mod > 0) {
        maxPage++;
      }
      return maxPage;
    },
    pages() {
      const pages = [[], []];
      const firstPage =
        this.modelPage % 2 === 0 ? this.modelPage - 1 : this.modelPage;
      if (this.maxPage < 4) {
        pages[0] = this.maxPage === 1 ? [1] : [1, 2];
        pages[1] = this.maxPage <= 2 ? [] : [3];
      } else if (this.maxPage - firstPage >= this.pageSize) {
        pages[0] = [firstPage, firstPage + 1];
        pages[1] = [firstPage + this.pageSize - 1, firstPage + this.pageSize];
      } else {
        pages[0] =
          firstPage + 3 >= this.maxPage
            ? [this.maxPage - 3, this.maxPage - 2]
            : [firstPage, firstPage + 1];
        pages[1] = [this.maxPage - 1, this.maxPage];
      }
      return pages;
    },
  },
  methods: {
    onSizeChanged(event) {
      const newValue = +event.target.value;
      if (this.pageSize !== newValue) {
        this.$emit("update:pageSize", newValue);
        this.$router.replace({
          query: { page: 1, size: newValue },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.options {
  display: flex;
  align-items: center;
  justify-content: space-around;
  &__pagination {
    display: flex;

    &__button {
      background: white;
      margin-left: -1px;
      color: black;
      border: 1px solid black;
      display: flex;
      height: 30px;
      min-width: 30px;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: gray;
        color: white;
        font-weight: 700;
      }

      &_disabled {
        pointer-events: none;
        cursor: auto;
        opacity: 0.5;
      }

      &_active {
        pointer-events: none;
        cursor: auto;
        font-weight: 700;
        color: gray;
        border-color: gray;
      }

      &_first {
        border-radius: 3px 0 0 3px;
      }

      &_last {
        border-radius: 0 3px 3px 0;
      }

      &_center {
        border: none;
        background: none;
        user-select: none;
        pointer-events: none;

        &:hover {
          background: none;
          font-weight: 400;
          color: gray;
        }
      }
    }

    &__icon {
      font-size: 16px;
    }
  }

  &__count-selector {
    height: 30px;
    cursor: pointer;
  }
}
</style>
