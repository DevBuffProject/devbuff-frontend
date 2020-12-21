<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">Cras justo odio</li>
      <li class="list-group-item">Dapibus ac facilisis in</li>
      <li class="list-group-item">Morbi leo risus</li>
      <li class="list-group-item">Porta ac consectetur ac</li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>
    <li v-for="(value, index) in specialistsMap"  :key="index">
      {{ index }}
      {{ value }}
    </li>
  </div>
</template>

<script>
export default {
  name: 'v-specialist-picker',
  props: {
    specialists: {
      type: Array,
      default: null
    }
  },

  computed: {
    specialistsMap: function () {
      let specialistsMap = {};

      for (let language of this.specialists) {
        for (let specialization of language.specializations) {
          let specialist = specialistsMap[specialization.name];
          if (specialist === undefined) {
            specialistsMap[specialization.name] = [];
            specialist = specialistsMap[specialization.name];
          }
          specialist.push({
            name: language.name,
            technologies: []
          });
          let technologies = [];
          for (let technology of specialization.frameworks) {
            technologies.push({
              name: technology.name
            });
          }
          specialist[specialist.length - 1].technologies = technologies;

        }

      }
      console.log("DATA");
      console.log( specialistsMap);
      return specialistsMap;
    }
  },
  created() {
  }
}
</script>

<style scoped>
.list-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.25rem;
}

.list-group-item {
  position: relative;
  display: block;
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.list-group-item:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}

.list-group-item:last-child {
  border-bottom-right-radius: inherit;
  border-bottom-left-radius: inherit;
}

.list-group-item.disabled, .list-group-item:disabled {
  color: #6c757d;
  pointer-events: none;
  background-color: #fff;
}

.list-group-item.active {
  z-index: 2;
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.list-group-item + .list-group-item {
  border-top-width: 0;
}

.list-group-item + .list-group-item.active {
  margin-top: -1px;
  border-top-width: 1px;
}
</style>
