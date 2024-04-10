<template>
  <component :is="isDetail ? 'div' : 'tr'" @click="$emit('onClickRow')">
    <component
      :is="isDetail ? 'div' : 'td'"
      v-for="(col, index) in columns"
      :key="index"
      :class="{ cell: isDetail }"
    >
      <div v-if="isDetail" class="cell__title">{{ col }}:</div>
      <div>
        <span v-if="!row[col]">-</span>
        <img
          v-else-if="col === 'picture' && row[col] && row[col].medium"
          :src="row[col].medium"
          alt="user photo"
        />
        <div class="cell__item" v-else-if="typeof row[col] === 'object'">
          <div
            class="cell__subitem"
            v-for="key in Object.keys(row[col])"
            :key="key"
          >
            <div>{{ key }}</div>
            :
            <span v-if="!row[col][key]">-</span>
            <div class="cell" v-else-if="typeof row[col][key] === 'object'">
              <div
                class="cell__subitem"
                v-for="subkey in Object.keys(row[col][key])"
                :key="subkey"
              >
                <div class="cell__subtitle">
                  {{ subkey }}
                </div>
                :
                <div>
                  {{ row[col][key][subkey] }}
                </div>
              </div>
            </div>
            <div v-else-if="key === 'date'">
              {{ formatDate(row[col][key]) }}
            </div>
            <div v-else>
              {{ row[col][key] }}
            </div>
          </div>
        </div>
        <div v-else>{{ row[col] }}</div>
      </div>
    </component>
  </component>
</template>

<script>
export default {
  name: "SingleItem",
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    row: {
      type: Object,
      default: () => {},
    },
    isDetail: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(origin) {
      const date = new Date(origin);
      return date.toLocaleString("ru-Ru", { timeZone: "Europe/Moscow" });
    },
  },
  emits: ["onClickRow"],
};
</script>

<style scoped lang="scss">
tr {
  cursor: pointer;
  transition: all 0.1s linear;
  &:hover {
    background-color: azure;
  }
}
td {
  border: 1px solid #ced4da;
  padding: 5px;
}
.cell {
  display: flex;
  gap: 5px;
  padding-bottom: 10px;

  &__title {
    font-weight: 600;
  }
  &__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  &__subtitle {
    font-style: italic;
  }
  &__subitem {
    display: flex;
    align-items: flex-start;
  }
}
</style>
