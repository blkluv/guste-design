export default {
  name: "servicesPage",
  title: "Page",
  type: "document",
  liveEdit: true,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Services",
      };
    },
  },
};
