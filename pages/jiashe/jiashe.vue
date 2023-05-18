<template>
  <div class="dropdown">
    <div class="dropdown-toggle" @click="toggleDropdown">
      {{ selectedOption }}
      <i class="fa fa-chevron-down"></i>
    </div>
    <div class="dropdown-menu" :class="{ 'is-open': isOpen }">
      <ul>
        <li v-for="(option, index) in options" :key="index" @click="selectOption(option)">
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
      selectedOption: '',
      options: ['Option 1', 'Option 2', 'Option 3']
    }
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectOption(option) {
      this.selectedOption = option
      this.isOpen = false
    }
  }
}
</script>

<style>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  cursor: pointer;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease-in-out;
}

.dropdown-menu.is-open {
  max-height: 200px;
  transition: max-height 0.3s ease-in-out;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
}
</style>