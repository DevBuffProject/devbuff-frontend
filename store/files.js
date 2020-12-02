export const state = () => ({})

export const actions = {
  async uploadImage(ctx, image) {
    const data = new FormData();

    data.append('image', image, image.fileName);

    const { imagePath } = await this.$api.latest.post('image', data)

    return `${this.$config.API_BASE_URL}/image/${imagePath}`
  },
}

export default {
  state,
  actions,
}
