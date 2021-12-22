<template>
  <AtomicDialog>
    <template #activator="{ show }">
      <AtomicButton @click="show">toggle</AtomicButton>
    </template>

    <template #default="{ shown, hide }">
      <AtomicCard>
        <h1 class="text-center">Welcome</h1>
        <p
          v-for="i of 1"
          :key="i"
          :class="{
            'transition-all': true,
          }"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
          consequatur debitis eligendi excepturi expedita fuga harum id,
          incidunt ipsum maxime mollitia nesciunt, nisi nulla quasi quia rerum
          soluta veritatis voluptate!
        </p>
        <AtomicButton red narrow @click="hide" class="mt-4"
          >decline</AtomicButton
        >
      </AtomicCard>
    </template>
  </AtomicDialog>

  <A.Dialog name="name">
    <template #activator="{ show }">
      <button @click="show">show</button>
    </template>

    <AtomicCard>12</AtomicCard>
  </A.Dialog>

  <A.Dialog.Activator> active <button></button></A.Dialog.Activator>
</template>

<script>
void {
  Dialog: '',
}
</script>
