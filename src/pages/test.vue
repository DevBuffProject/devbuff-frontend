<template>
  <div>
    <suspense>
      <AtomicDialog visible>
        <Dialog></Dialog>
      </AtomicDialog>

      <template #fallback>
        <AtomicLoadingOverlay></AtomicLoadingOverlay>
      </template>
    </suspense>
    <AtomicTabs>
      <AtomicTabsTab name="О себе">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab autem,
        consequuntur laboriosam laudantium minus molestias nobis obcaecati quae
        repellendus tempora. Ab architecto commodi excepturi nisi quia quibusdam
        recusandae totam voluptas?
      </AtomicTabsTab>

      <AtomicTabsTab name="Скиллы"> </AtomicTabsTab>
    </AtomicTabs>
  </div>
</template>

<script setup>
import Dialog from './settings.vue'
</script>
