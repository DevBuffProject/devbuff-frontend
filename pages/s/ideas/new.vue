<template>
  <div class="new-idea container">
    <client-only>
      <quill-editor
        :options="{
          theme: 'bubble'
        }"
      />
    </client-only>
  </div>
</template>

<script>
export default {
}
</script>
